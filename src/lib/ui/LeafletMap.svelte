<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type { Control, Map as LeafletMap, LayerGroup } from "leaflet";
  import { browser } from "$app/environment";
  import L from "leaflet";
  import "leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.js";
  import "leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.css";
	import type { User, Club, Game, DataSet, DataSetGames } from '$lib/types/rugby-club-poi-types';
  import ForecastTemp from "$lib/ForecastTemp/ForecastTemp.svelte";
  import CurrentTemp from "$lib/CurrentTemp/CurrentTemp.svelte";  
  import { generateReading, generateForecast } from '$lib/utilities/openweathermap-utils';
  
  export const ssr = false;

  export let id = "home-map-id";
  export let height = 80;
  export let location = { lat: 53.2734, lng: -7.7783203 };
  export let width = 54;
  export let zoom = 8;
  export let minZoom = 7;
  export let activeLayer = "Terrain";
  export let allowCategories = false;
  export let centerOnMarker = false;
  // export let onClickPopup = true;

  export let club: Club[] = [];
  


  let imap: LeafletMap;
  let control: Control.Layers;
  let overlays: Control.LayersObject = {};
  let baseLayers: any;
  let categoryLayers: Record<string, LayerGroup> = {};  
  let countyLayers: Record<string, LayerGroup> = {};
  let countyAdded:any = [];
  let showClub: Club[] = [];
  let currentWeather: any;
  let currentForecast: any;
    

  let categories = ["JUNIOR", "SENIOR"];
  let counties = [
    "Antrim", "Armagh", "Carlow", "Cavan", "Clare", "Cork", "Derry", "Donegal", "Down", 
    "Dublin", "Fermanagh", "Galway", "Kerry", "Kildare", "Kilkenny", "Laois", "Leitrim", 
    "Limerick", "Londonderry", "Longford", "Louth", "Mayo", "Meath", "Monaghan", "Offaly", "Omagh", "Roscommon", "Sligo", "Tipperary", "Tyrone", "Waterford", "Westmeath", "Wexford", "Wicklow"
  ];
 
  

  onMount(async () => {
    if (browser) {;
      const leaflet = await import("leaflet");

      if (allowCategories) {
        categories.forEach(category => {
            categoryLayers[category] = L.layerGroup();
        });        
                
        counties.forEach((county: any) => {
            countyLayers[county] = L.layerGroup();
        });
      };

      baseLayers = {
        Terrain: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 17,
          attribution:
            'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }),
        Satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
          attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        }),
        OpenTopoMap: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          maxZoom: 17,
          attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }),
        Stadia_AlidadeSatellite: L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
          minZoom: 0,
          maxZoom: 20,
          attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          ext: 'jpg'
        }),
        Stadia_AlidadeSmoothDark: L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
            minZoom: 0,
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
          }), 
        MtbMap: L.tileLayer('http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; USGS'
        })
      };

      let defaultLayer = baseLayers[activeLayer];

      imap = leaflet.map(id, {
        center: [location.lat, location.lng],
        zoom: zoom,
        minZoom: minZoom,
        layers: [defaultLayer]
      });

        

      let groupedOverlays = {
              SelectCategory: {},
              SelectCounty: {}
            };

      if (allowCategories) {
        Object.values(categoryLayers).forEach(layer => {
              imap.addLayer(layer);
          }); 
        Object.values(countyLayers).forEach(layer => {
              imap.addLayer(layer);
          }); 

            for (let category in categoryLayers) {
              groupedOverlays.SelectCategory[category] = categoryLayers[category];    
            }
            // console.log (countyLayers)
            for (let county in countyLayers) {
              groupedOverlays.SelectCounty[county] = countyLayers[county];    
            }
      };

      if (allowCategories) {
        const control = leaflet.control.groupedLayers(baseLayers, groupedOverlays).addTo(imap);
      } else {
        const control = leaflet.control.layers(baseLayers).addTo(imap);
      }

    }
  });

  async function getClubWeather(club: Club) {
   
      let currentTemp: CurrentTemp = {
        temp: null,
        feels_like: null,
        humidity: null,
        description: null,
        iconCode: null,
      };

      let currentWeather = await generateReading(club.latitude, club.longitude);
      let tempForecast = await generateForecast(club.latitude, club.longitude);

      const currentForecast = tempForecast.data.list;

      currentTemp.temp = currentWeather.data.main.temp;
      currentTemp.feels_like = currentWeather.data.main.feels_like;
      currentTemp.humidity = currentWeather.data.main.humidity;
      currentTemp.description = currentWeather.data.weather[0].description;
      currentTemp.iconCode = currentWeather.data.weather[0].id;

      currentWeather = currentTemp;
      tempForecast = currentForecast;

      return {
        currentForecast: currentForecast,
        currentWeather: currentTemp,
      };
  }
  

  export async function addMarker(lat: number, lng: number, popupText: string, currentClub: Club, onClickPopup) {
    const leaflet = await import("leaflet");
    const marker = leaflet.marker([lat, lng]);   
    // console.log(popupText); 

    marker.addTo(imap);
    if(onClickPopup) {
      const popup = leaflet.popup({ autoClose: true, closeOnClick: false });
      popup.setContent(popupText);
      marker.bindPopup(popup);        

      // Add an event listener to the marker
      marker.on('click', function() {
        
          const hiddenDiv = document.getElementById(currentClub.address);

          const hideAddressDivs = document.querySelectorAll('div[data-address]');
          hideAddressDivs.forEach(div => div.hidden = true);

          hiddenDiv.hidden = false;

          console.log(currentClub._id);
          getClubWeather(currentClub).then(data => {
            const currentWeather = data.currentWeather;
            const currentForecast = data.currentForecast;  
            console.log(currentWeather);
            console.log(currentForecast);
          });

          // Scroll to the div
          setTimeout(() => {
            window.scroll({
              top: document.body.scrollHeight,
              behavior: 'smooth'
            });
            
          }, 300);
        
      });
    };
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
</script>

<div {id} class="box" style="height: {height}vh; width: {width}vh" />
