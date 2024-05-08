<script lang="ts">
	
	// @ts-ignore
	import Chart from 'svelte-frappe-charts';
	import type { User, Club, Game, DataSet, DataSetGames } from '$lib/types/rugby-club-poi-types';
	import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
	import { currentSession, clubStore } from '$lib/stores';
	import { getCategoryData, getGamesData } from '$lib/utilities/club-utils';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { Tooltip, tooltip } from 'leaflet';

	let clubs = [];
  	let games = [];
	let chartType = 'bar';
	let chartTypes = ['bar', 'line', 'percentage'];
  	

	//export let clubs: Club[];
	export let data: any;

	clubStore.subscribe((value) => {
		clubs = value;
	});

	let categoryData: DataSet = { labels: [], datasets: [{ values: [] }], };
  	let gamesData: DataSetGames = { labels: [], datasets: [{ name: '', chartType: '', values: [] },
	{ name: '', chartType: '', values: [] }]};

  let options = {
    height: 250,
    colors: ['#7cd6fd', '#743ee2']
  };

	onMount(async () => {
		const fetchedClubs = data.clubs;
		const fetchedGames = data.games;
		console.log('onMount Charts:');
		console.log(data.clubs);
		console.log(fetchedClubs);
    	gamesData = getGamesData(fetchedGames);
		categoryData = getCategoryData(fetchedClubs);
	});
</script>


<!-- <div class="">
      <input type="radio" bind:group={chartType} value="bar"> Bar Chart
      <input type="radio" bind:group={chartType} value="percentage"> Percentage Chart
  </div>
  {#if chartType === 'bar'}
    <Chart type="bar" data={categoryData} />
  {/if}
  
  {#if chartType === 'line'}
  <Chart type="line" data={categoryData} />
{/if}
    {#if chartType === 'percentage'}
      <Chart type="percentage" data={categoryData} />
    {/if}  -->

<section class="section page-margin">
	<h1 class="title page-heading is-2 is-uppercase mb-5">RUGBYCLUBPOI Charts</h1>
	<div class="columns">
		<div class="column is-narrow center-content">
			Bar Chart
			<div class="buttons are-large">
				<input class="button is-normal test {chartType === 'bar' ? 'is-selected' : ''}" type="radio" bind:group={chartType} value="bar" />
			</div>
			Percentage Chart
			<div class="buttons">
				<input class="button is-centered is-normal test {chartType === 'percentage' ? 'is-selected' : ''}" type="radio" bind:group={chartType} value="percentage" />
			</div>
		</div>

		<div class="column">
			{#if chartType === 'bar'}
				<Chart title="Club Type Bar Chart" height=200  type="bar" data={categoryData} />
			{:else if chartType === 'percentage'}
				<Chart title="Club Type Percentage Chart" height=200 type="percentage" data={categoryData} />
			{/if}
		</div>
	</div>
  <div class="column">    
      <Chart title="Game Score Distribution" isNavigable type="line" height=500 data={gamesData} {options}/>
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
