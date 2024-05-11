
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
				<i class="fa-solid fa-square-minus fa-xl mr-2"></i>Hide Weather
			{:else}
				<i class="fa-solid fa-square-plus fa-xl mr-2"></i>Display Weather
			{/if}
		</button>
	</div>
</div>
{#if showWeather}
<div class="field has-background-warning px-6 pb-4">
    <!-- <span class="is-uppercase has-text-weight-bold">Weather</span>span class="is-uppercase has-text-weight-bold">Weather</span> -->
	<div class="pb-4">
        <CurrentTemp currentWeather={currentWeather}/>
    </div>    
    <ForecastTemp currentForecast={currentForecast} />
</div>
			
{/if}