<script lang="ts">
    import ForecastTemp from "$lib/ForecastTemp/ForecastTemp.svelte";
    import CurrentTemp from "$lib/CurrentTemp/CurrentTemp.svelte";

	export let data: any;
</script>

<section class="section pt-6">
    <div class="pb-4">
        <CurrentTemp currentWeather={data.currentWeather}/>
    </div>    
        <ForecastTemp currentForecast={data.currentForecast} />
</section>