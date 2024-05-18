<script lang="ts">
	// @ts-ignore
	import Chart from 'svelte-frappe-charts';
	import type { Club, Game, DataSet, DataSetGames } from '$lib/types/rugby-club-poi-types';
	import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
	import { currentSession, clubStore } from '$lib/stores';
	import { getCategoryData, getGamesData, getClubsPerCountyData, getGamesPlayedData } from '$lib/utilities/club-utils';
	import { currentForecast, currentWeather } from '$lib/stores';
	import { generateReading, generateForecast } from '$lib/utilities/openweathermap-utils';
	import Card from '$lib/ui/Card.svelte';  
	import { onMount, onDestroy } from 'svelte';
	import { get } from 'svelte/store';
	import { Tooltip, tooltip } from 'leaflet';

	let clubs = [];
	let games = [];
	let chartType = 'bar';
	let chartTypes = ['bar', 'line', 'percentage'];
	let selectedClub: string;
	let selectedType: "temperature" | "wind" | "pressure" | "humidity" = "temperature";
	// let averages: any;

	export let data: any;

	let forecast;
    const unsubscribe = currentForecast.subscribe(value => {
      forecast = value;
    });

    onDestroy(unsubscribe);

	clubStore.subscribe((value) => {
		clubs = value;
	});

	let weatherData: DataSet = { labels: [], datasets: [{ values: [] }] };
	let categoryData: DataSet = { labels: [], datasets: [{ values: [] }] };
	let countyData: DataSet = { labels: [], datasets: [{ values: [] }] };
	let gamesPlayedData: DataSet = { labels: [], datasets: [{ values: [] }] };
	let gamesData: DataSetGames = {
		labels: [],
		datasets: [
			{ name: '', chartType: '', values: [] },
			{ name: '', chartType: '', values: [] }
		]
	};

	export let options = {
		height: 250,
		colors: ['#7cd6fd', '#743ee2'],
	};

	async function fetchWeatherData(club: Club) {	
		let tempForecast = await generateForecast(club.latitude, club.longitude);

		currentForecast.set(tempForecast.data.list);
	}

		
	async function clubChange(clubs: Club[]) {
		let club = clubs.find((c) => c._id === selectedClub);
		await fetchWeatherData(club);
		updateData();
	}

	async function TypeChange(clubs: Club[]) {
		let club = clubs.find((c) => c._id === selectedClub);
		await fetchWeatherData(club);
		updateData();
	}
	
	async function updateData() {		
		let values: number[];
		resetData();

		const filteredData = forecast.filter((entry: { dt_txt: string }) => {
			const time = new Date(entry.dt_txt).getHours();
			return time === 12 || time === 21;
		});

		const labels = filteredData.map((entry: { dt_txt: string }) => entry.dt_txt);
		
		// if (selectedType === 'temperature') {
		// 	values = filteredData.map((entry: { main: { temp: number } }) => entry.main.temp);
		// } else if (selectedType === 'wind') {
		// 	values = filteredData.map((entry: { wind: { speed: number } }) => entry.wind.speed);
		// } else if (selectedType === 'pressure') {
		// 	values = filteredData.map((entry: { main: { pressure: number } }) => entry.main.pressure);
		// } else if (selectedType === 'humidity') {
		// 	values = filteredData.map((entry: { main: { humidity: number } }) => entry.main.humidity);
		// } else {
		// 	values = [];
		// }

		const valueMap = {
			'temperature': (entry: { main: { temp: number } }) => entry.main.temp,
			'wind': (entry: { wind: { speed: number } }) => entry.wind.speed,
			'pressure': (entry: { main: { pressure: number } }) => entry.main.pressure,
			'humidity': (entry: { main: { humidity: number } }) => entry.main.humidity,
		};

   		values = filteredData.map(valueMap[selectedType] || (() => []));
		console.log(values);
		
		// // Calculate averages
		// averages = Object.keys(valueMap).reduce((acc, key) => {
		// 	const keyValues = filteredData.map(valueMap[key]);
		// 	const average = calculateAverage(keyValues);
		// 	return { ...acc, [key]: average };
		// }, {});

		console.log(averages);
				
		weatherData = { labels, datasets: [ { values } ] };
	}

	
	// function calculateAverage(data) {
	// 	const sum = data.reduce((total, item) => total + item, 0);
	// 	return data.length ? sum / data.length : 0;
	// }

	function resetData(): void {
		weatherData = { labels: [], datasets: [{ values: [] }] };
	}

	/**
	 * Initializes the chart data when the component is mounted.
	 * - Fetches the clubs and games data from the `data` object.
	 * - Sets the initial `selectedClub` and `selectedType` values.
	 * - Calls the `clubChange` function with the fetched clubs data.
	 * - Generates the `gamesData`, `categoryData`, `countyData`, and `gamesPlayedData` based on the fetched data.
	 */
	onMount(async () => {
		const fetchedClubs = data.clubs;
		const fetchedGames = data.games;
		selectedClub = data.clubs[0]._id;
		selectedType = 'temperature';
		clubChange(data.clubs);
		// await fetchWeatherData(data.clubs);
		// console.log('onMount Charts:');
		// console.log(data.clubs);
		// console.log(fetchedClubs);
		gamesData = getGamesData(fetchedGames);
		categoryData = getCategoryData(fetchedClubs);
		countyData = getClubsPerCountyData(fetchedClubs);
		gamesPlayedData = getGamesPlayedData(fetchedClubs, fetchedGames);
	});
</script>

<section class="section pt-6">
	<div class="blog-posts">
		<div class="box box-link-hover-shadow">
			<h1 class="title page-heading is-2 is-uppercase mb-5">Charts</h1>
			<Card title="Weather Forecast">
				<span slot="first-select-header" class="is-flex is-align-items-center">
					<div class="select is-normmediumal mr-3">
						<select bind:value={selectedClub} on:change={clubChange(data.clubs)}>
							{#each data.clubs as club}
							  <option value={club._id}>{club.club}</option>
							{/each}
						  </select>
					</div>
					<div class="select is-normal mr-3">
						<select bind:value={selectedType} on:change={TypeChange(data.clubs)}>
							<option value="temperature">Temperature</option>
							<option value="wind">Wind Speed</option>
							<option value="pressure">Pressure</option>
							<option value="humidity">Humidity</option>
						  </select>
					</div>
				</span>
				<Chart data={weatherData} type="line" />	
				
			</Card>
			
			<Card title="Club Type">
			<div class="columns">
				<div class="column is-narrow center-content">
					Bar Chart
					<div class="buttons are-large">
						<input class="button is-normal test {chartType === 'bar' ? 'is-selected' : ''}" type="radio" bind:group={chartType} value="bar" />
						<!-- <input class="button is-normal test" type="radio"  value="bar" /> -->
					</div>
					Percentage Chart
					<div class="buttons">
						<!-- <input class="button is-normal test " type="radio"  value="percentage" /> -->
						<input class="button is-normal test {chartType === 'percentage' ? 'is-selected' : ''}" type="radio" bind:group={chartType} value="percentage" />
					</div>
				</div>

				<div class="column">
					{#if chartType === 'bar'}
						<Chart height="200" type="bar" data={categoryData} />
					{:else if chartType === 'percentage'}
						<Chart height="200" type="percentage" data={categoryData} />
					{/if}
				</div>
			</div>
			</Card>	
			
			<Card title="Game Score Distribution">
				<div class="column">				
					<Chart isNavigable type="line" height="500" data={gamesData} {options} />
				</div>
			</Card>
			<Card title="CLUBS PER COUNTY">
				<div class="column">	
					<Chart height="200" type="bar" data={countyData} />
				</div>
			</Card>
			<Card title="GAMES PLAYED PER CLUB">
				<div class="column">	
					<Chart height="200" type="bar" data={gamesPlayedData} />
				</div>
			</Card>
			
		</div>
	</div>
</section>

<style>
	.center-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.test {
		/* border: 1px solid #000; */
		line-height: 20px;
		text-align: center;
		display: inline-block;
	}
	.test:checked {
		background-color: #6e6e6e;
	}
</style>
