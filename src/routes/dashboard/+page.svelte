<script lang="ts">
	import ListClub from "./ListClub.svelte";
	import AddClub from "./AddClub.svelte";

export let data: any;
</script>

<section class="section pt-6">
	{#if data.clubs}
	
	<ListClub club={data.clubs} games={data.games} images={data.images} currentWeather={data.currentWeather} currentForecast={data.currentForecast}/>
	{:else}
	<AddClub />
	{/if}
	
</section>
