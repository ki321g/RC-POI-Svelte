
<script lang="ts">

	let showWeather = false;

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
<div class="field">
    <span class="is-uppercase has-text-weight-bold">Weather</span>
</div>
			
{/if}