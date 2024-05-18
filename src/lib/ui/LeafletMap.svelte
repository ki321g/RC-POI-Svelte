<script lang="ts">
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import type { Control, Marker, Map as LeafletMap, LayerGroup } from 'leaflet';
	import icon from 'leaflet/dist/images/marker-icon.png';
	import iconShadow from 'leaflet/dist/images/marker-shadow.png';
	import 'leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.js';
	import 'leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { User, Club, Game, DataSet, DataSetGames } from '$lib/types/rugby-club-poi-types';
	import { currentForecast, currentWeather } from '$lib/stores';
	import { generateReading, generateForecast } from '$lib/utilities/openweathermap-utils';
    import { toSentenceCase } from "$lib/utilities/toSentenceCase";
    import WeatherIcon from "$lib/ui/WeatherIcon.svelte"; 
	import { getWeatherIcon } from "$lib/utilities/getWeatherIcon";
	import { onDestroy } from 'svelte';

	export const ssr = false;
	const apiKey = import.meta.env.VITE_WEATHER_API; // API key from .env file

	export let id = 'home-map-id';
	export let height = 80;
	export let location = { lat: 53.2734, lng: -7.7783203 };
	export let width = 54;
	export let zoom = 8;
	export let minZoom = 7;
	export let activeLayer = 'Satellite';
	export let allowCategories = false;
	export let centerOnMarker = false;


	let weather;
    const unsubscribe = currentWeather.subscribe(value => {
      weather = value;
    });

    onDestroy(unsubscribe);

	let imap: LeafletMap;
	let control: Control.Layers;
	let overlays: Control.LayersObject = {};
	let baseLayers: any;
	let categoryLayers: Record<string, LayerGroup> = {};
	let countyLayers: Record<string, LayerGroup> = {};
	let countyAdded: any = [];
	let showClub: Club[] = [];

	let categories = ['JUNIOR', 'SENIOR'];
	let counties = [
		'Antrim',
		'Armagh',
		'Carlow',
		'Cavan',
		'Clare',
		'Cork',
		'Derry',
		'Donegal',
		'Down',
		'Dublin',
		'Fermanagh',
		'Galway',
		'Kerry',
		'Kildare',
		'Kilkenny',
		'Laois',
		'Leitrim',
		'Limerick',
		'Londonderry',
		'Longford',
		'Louth',
		'Mayo',
		'Meath',
		'Monaghan',
		'Offaly',
		'Omagh',
		'Roscommon',
		'Sligo',
		'Tipperary',
		'Tyrone',
		'Waterford',
		'Westmeath',
		'Wexford',
		'Wicklow'
	];

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');

			if (allowCategories) {
				categories.forEach((category) => {
					categoryLayers[category] = L.layerGroup();
				});

				counties.forEach((county: any) => {
					countyLayers[county] = L.layerGroup();
				});
			}

			baseLayers = {
				Terrain: leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					maxZoom: 17,
					attribution:
						'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
				}),
				Satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
					attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
				}),
				OpenMap: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
					maxZoom: 17,
					attribution:
						'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
				}),
				RoadMap: L.tileLayer('http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; USGS'
				})
			};

			const openWeatherLayer = {
				Precipitation: L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`, { opacity: 0.5 }),
				Temperature: L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`, { opacity: 0.5 }),
				Clouds: L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`, { opacity: 0.5 }),
				Wind: L.tileLayer(`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`, { opacity: 0.5 }),
				Rain: L.tileLayer(`https://tile.openweathermap.org/map/rain_new/{z}/{x}/{y}.png?appid=${apiKey}`, { opacity: 0.5 }),
				Snow: L.tileLayer(`https://tile.openweathermap.org/map/snow_new/{z}/{x}/{y}.png?appid=${apiKey}`, { opacity: 0.5 }),
				Pressure: L.tileLayer(`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${apiKey}`, { opacity: 0.5 })
			};

			let defaultLayer = baseLayers[activeLayer];

			imap = leaflet.map(id, {
				center: [location.lat, location.lng],
				zoom: zoom,
				minZoom: minZoom,
				layers: [defaultLayer, openWeatherLayer.Rain, openWeatherLayer.Precipitation, openWeatherLayer.Clouds, openWeatherLayer.Wind]
			});

			let groupedOverlays = {
				SelectCategory: {},
				SelectWeather: {
					Pressure: openWeatherLayer.Pressure,
					Precipitation: openWeatherLayer.Precipitation,
					Temperature: openWeatherLayer.Temperature,
					Clouds: openWeatherLayer.Clouds,
					Wind: openWeatherLayer.Wind,
					Rain: openWeatherLayer.Rain,
					Snow: openWeatherLayer.Snow
				},
				SelectCounty: {}
			};

			if (allowCategories) {
				Object.values(categoryLayers).forEach((layer) => {
					imap.addLayer(layer);
				});
				Object.values(countyLayers).forEach((layer) => {
					imap.addLayer(layer);
				});

				for (let category in categoryLayers) {
					groupedOverlays.SelectCategory[category] = categoryLayers[category];
				}
				
				for (let county in countyLayers) {
					groupedOverlays.SelectCounty[county] = countyLayers[county];
				}
			}

			if (allowCategories) {
				const control = leaflet.control.groupedLayers(baseLayers, groupedOverlays).addTo(imap);
			} else {
				const control = leaflet.control.layers(baseLayers).addTo(imap);
			}
		}
	});

	export async function addMarker(lat: number, lng: number, popupText: string, currentClub: Club, onClickPopup) {
		const iconUrl = '/images/marker-icon.png';
		const shadowUrl = '/images/marker-shadow.png';
		const iconRetinaUrl = '/images/marker-icon-2x.png';

		const leaflet = await import('leaflet');

		const iconDefault = leaflet.icon({
			iconRetinaUrl,
			iconUrl,
			shadowUrl,
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			tooltipAnchor: [16, -28],
			shadowSize: [41, 41]
		});

		const marker = leaflet.marker([lat, lng], {
			icon: iconDefault
		});

		marker.addTo(imap);

		let DefaultIcon = L.icon({
			iconUrl: icon,
			shadowUrl: iconShadow
		});

		leaflet.Marker.prototype.options.icon = DefaultIcon;

		if (onClickPopup) {
			const popup = leaflet.popup({ autoClose: true, closeOnClick: false });
			marker.bindPopup(popup);

			// Add an event listener to the marker
			marker.on('click', async function () {
				const hiddenID = currentClub.address.toString() + "_" + currentClub._id.toString() 
				const hiddenDiv = document.getElementById(hiddenID);

				//fetch weather data
				await fetchWeatherData(currentClub);

				
				// Adding weather to popupText
				const weatherIcon = getWeatherIcon(weather.iconCode)
				
								
				popupText += `
					<div class="columns is-centered is-vcentered mt-3">
						<div class="column is-narrow">
							<i class="${weatherIcon}" style="font-size: 4em;"></i>
							<br><strong>${toSentenceCase(weather.description)}</strong>
						</div>
						<div class="column">
							<strong>Temp: </strong><span class="current-temp">${weather.temp}&deg;C</span><br>
							<strong>Feels like </strong>${weather.feels_like}&deg;C<br>
							<strong>Humidity: </strong>${weather.humidity}%
						</div>
					</div>
				`;

				popup.setContent(popupText);

				const hideAddressDivs = document.querySelectorAll('div[data-id]');
				hideAddressDivs.forEach((div) => (div.hidden = true));

				hiddenDiv.hidden = false;

				// Scroll to the div
				// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
				setTimeout(() => {
					window.scroll({
						top: 825,
						behavior: 'smooth'
					});
				}, 1000);
			});
		}
		if (currentClub) {
			categoryLayers[currentClub.category].addLayer(marker);
			countyAdded.push(currentClub.address);
			countyLayers[currentClub.address].addLayer(marker);
		}

		// Recenter the map to the marker's location
		if (centerOnMarker) {
			imap.setView([lat, lng], imap.getZoom());
		}
	}
	export function moveTo(lat: number, lng: number) {
		imap.flyTo({ lat: lat, lng: lng });
	}

	async function fetchWeatherData(club: Club) {
		//variable for weather data
		let setWeather: setWeather = {
			temp: null,
			feels_like: null,
			humidity: null,
			description: null,
			iconCode: null
		};

		// fetch weather data from openweathermap
		let tempWeather = await generateReading(club.latitude, club.longitude);

		// set weather data
		setWeather.temp = tempWeather.data.main.temp;
		setWeather.feels_like = tempWeather.data.main.feels_like;
		setWeather.humidity = tempWeather.data.main.humidity;
		setWeather.description = tempWeather.data.weather[0].description;
		setWeather.iconCode = tempWeather.data.weather[0].id;

		// Set weather store data
		currentWeather.set(setWeather);

		// fetch forecast data from openweathermap
		let tempForecast = await generateForecast(club.latitude, club.longitude);
		// set forecast store data
		currentForecast.set(tempForecast.data.list);
	}
</script>

<div {id} class="box" style="height: {height}vh; width: {width}vh" />
