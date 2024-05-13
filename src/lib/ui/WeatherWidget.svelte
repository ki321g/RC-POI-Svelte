
<script lang="ts">
    import ForecastTemp from "$lib/ForecastTemp/ForecastTemp.svelte";
    import CurrentTemp from "$lib/CurrentTemp/CurrentTemp.svelte";  

	let showWeather = false;
    export let currentForecast: any;
    export let currentWeather: any;

    function toggleWeather() {
		showWeather = !showWeather;
	}

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