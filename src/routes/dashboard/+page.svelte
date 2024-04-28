<script lang="ts">
	import ListClub from "./ListClub.svelte";
	
	export let data: any;

</script>



<section class="section pt-6">
	{#if data.clubs}
	
	<ListClub club={data.clubs} />


	<!-- {data.clubs._id} -->
	{:else}
	<h1 class="title page-heading is-2 is-uppercase mb-3">No Clubs</h1>
	{/if}
	
</section>
