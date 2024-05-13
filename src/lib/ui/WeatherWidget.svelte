
<script lang="ts">
    import type { User, Club, Game, Image } from '$lib/types/rugby-club-poi-types';
    import ForecastTemp from "$lib/ForecastTemp/ForecastTemp.svelte";
    import CurrentTemp from "$lib/CurrentTemp/CurrentTemp.svelte";  
	import { currentForecast, currentWeather } from '$lib/stores';
	import { generateReading, generateForecast } from '$lib/utilities/openweathermap-utils';
 	import { onMount } from 'svelte';

	let showWeather = false;
    // export let currentForecast: any;
    // export let currentWeather: any;
	export let club: Club[] = [];

    function toggleWeather() {
		showWeather = !showWeather;
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

	onMount(async () => {       
        console.log(club);
		await fetchWeatherData(club);
    });
</script>

<div class="columns is-vcentered is-12">
    <div class="column is-fullwidth">
		<button class="button controlBtn is-warning is-fullwidth is-uppercase has-text-grey" on:click={toggleWeather}>
			{#if showWeather}
				<i class="fa-solid fa-square-minus fa-xl mr-2"></i>Hide Weather Forecast
			{:else}
				<i class="fa-solid fa-square-plus fa-xl mr-2"></i>Show Weather Forecast
			{/if}
		</button>
	</div>
</div>
{#if showWeather}

<div class="field has-background-light px-6 pb-4">
	<div class="has-text-left">
		<h2 class="title page-heading is-2 is-uppercase mb-0 pt-4">
			Current Weather
			<!-- {club.club} -->
		</h2>
	</div>
    <!-- <span class="is-uppercase has-text-weight-bold">Weather</span>span class="is-uppercase has-text-weight-bold">Weather</span> -->
	<div class="pb-4">
        <CurrentTemp currentWeather={currentWeather}/>
    </div>    
    <ForecastTemp currentForecast={currentForecast} />
</div>
			
{/if}