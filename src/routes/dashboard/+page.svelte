<script lang="ts">
	import ListClub from "./ListClub.svelte";
	import AddClub from "./AddClub.svelte";
	
	export let data: any;
</script>

<section class="section pt-6">
	{#if data.clubs}
	
	<ListClub club={data.clubs} games={data.games} images={data.images} />

	
	<!-- {data.clubs._id} -->
	{:else}
	<AddClub />
	{/if}
	
</section>
