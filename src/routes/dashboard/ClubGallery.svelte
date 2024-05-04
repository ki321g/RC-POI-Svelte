<script lang="ts">
	import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
	import type { User, Club, Game } from '$lib/types/rugby-club-poi-types';
	import InPlaceEdit from '$lib/ui/InPlaceEdit.svelte';
</script>

<div class="columns is-vcentered is-12">
	<div class="column is-fullwidth">
		<h2 class="title page-heading is-3 is-uppercase mb-0">Club Gallery</h2>
	</div>
	<div class="column is-fullwidth">
		<button class="button controlBtn is-warning is-medium is-fullwidth is-uppercase has-text-grey" on:click={toggleForm}>
			<!-- {#if showForm}Hide Add Game Form{:else}Show Add Game Form{/if} -->
		</button>
	</div>
</div>