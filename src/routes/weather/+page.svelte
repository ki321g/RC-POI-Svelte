<script lang="ts">
    import ForecastTemp from "$lib/ForecastTemp/ForecastTemp.svelte";

	export let data: any;
</script>

<section class="section pt-6">
    <ForecastTemp currentForecast={data.currentForecast} />
</section>