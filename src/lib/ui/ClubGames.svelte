<script lang="ts">
	import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
	import type { User, Club, Game } from '$lib/types/rugby-club-poi-types';
	import InPlaceEdit from '$lib/ui/InPlaceEdit.svelte';

	export let games: Game[] = [];
	export let club: Club[] = [];
	export let showButtons = true;

	let deleteGame: any;
	let updateGame: any;
	let showForm = false;

	function toggleForm() {
		showForm = !showForm;
	}
	function submit(field) {
		return ({ detail: newValue }) => {
			// IRL: POST value to server here
			console.log(`updated ${field}, new value is: "${newValue}"`);
		};
	}

	async function gameUpdate(game: Game) {
		const confirmUpdate = confirm('Your Updating this Game. Please click OK to continue?');
		// editedClub = club;
		// console.log(editedClub);
		// Set the values of the form inputs
		if (confirmUpdate) {
			try {
				console.log('Updating game...gameUpdate');
				console.log(game);
				updateGame.elements.gameid.value = game._id;
				updateGame.elements.home.value = game.home;
				updateGame.elements.homescore.value = game.homescore;
				updateGame.elements.awayscore.value = game.awayscore;
				updateGame.elements.away.value = game.away;
				updateGame.elements.gametime.value = game.gametime;
				updateGame.elements.gamelocation.value = game.gamelocation;
				updateGame.elements.clubid.value = game.clubid;

				console.log(updateGame.elements.gameid.value);
				console.log(updateGame.elements.home.value);
				console.log(updateGame.elements.homescore.value);
				console.log(updateGame.elements.awayscore.value);
				console.log(updateGame.elements.away.value);
				console.log(updateGame.elements.gametime.value);
				console.log(updateGame.elements.gamelocation.value);
				console.log(updateGame.elements.clubid.value);

				// Submit the form
				updateGame.submit();
			} catch (error) {
				console.log('Error updating club');
				alert('Error updating club');
				console.log(error);
			}
		} else {
			alert('Update Cancelled');
		}
	}

	async function gameDelete(gameId: String) {
		const confirmDelete = confirm('Deleting the Game is irreversible. Please click OK to delete this Game?');
		console.log(gameId);
		if (confirmDelete) {
			try {
				deleteGame.elements.gameid.value = gameId;
				console.log(deleteGame.elements.gameid.value);

				// Submit the form
				deleteGame.submit();
			} catch (error) {
				console.log('Error deleting club');
				alert('Error deleting club');
				console.log(error);
			}
		} else {
			alert('Delete Cancelled');
		}

	};
</script>

<div class="columns is-vcentered is-12">
	<div class="column is-fullwidth">
		<h2 class="title page-heading is-3 is-uppercase mb-0">Club Games</h2>
	</div>
	{#if showButtons}
	<div class="column is-fullwidth">
		<button class="button controlBtn is-warning is-fullwidth is-uppercase has-text-grey" on:click={toggleForm}>
			{#if showForm}
				<i class="fa-solid fa-square-minus fa-xl mr-2"></i>Hide Add Game
			{:else}
				<i class="fa-solid fa-square-plus fa-xl mr-2"></i>Add Game
			{/if}
		</button>
	</div>
	{/if}
</div>

{#if showForm}
	<form method="POST" action="?/addgame">	
		<div class="field is-horizontal">
			<div class="field-body">
				<div class="field">
					<span class="is-uppercase has-text-weight-bold">HOME TEAM</span>
					<input class="input" type="text" placeholder="Home Team" name="home" />
				</div>
				<div class="field">
					<span class="is-uppercase has-text-weight-bold">HOME Score</span>
					<input class="input" type="text" placeholder="0" name="homescore" />
				</div>
				<div class="field">
					<span class="is-uppercase has-text-weight-bold">Away Score</span>
					<input class="input" type="text" placeholder="0" name="awayscore" />
				</div>
				<div class="field">
					<span class="is-uppercase has-text-weight-bold">Away Team</span>
					<input class="input" type="text" placeholder="Away Team" name="away" />
				</div>
				<div class="field">
					<span class="is-uppercase has-text-weight-bold">Game Time</span>
					<input class="input" type="text" placeholder="Game Time" name="gametime" />
				</div>
				<div class="field">
					<span class="is-uppercase has-text-weight-bold">Game Location</span>
					<input class="input" type="text" placeholder="Game Location" name="gamelocation" />
				</div>
				<div class="field">
					<input class="input" type="hidden" value={club._id} name="clubid" />
				</div>
			</div>
		</div>
		<button class="button controlBtn is-warning is-medium is-uppercase has-text-grey is-fullwidth mb-4"> <i class="fas fa-plus-square fa-xl mr-2"></i>Add Game</button>
	</form>
{/if}

<table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
	<thead>
		<tr class="is-uppercase">
			<th>Home Team</th>
			<th>Home Score</th>
			<th>Away Score</th>
			<th>Away Team</th>
			<th>Game Time</th>
			<th>Game Location</th>
			{#if showButtons}
			<th>Action</th>
			{/if}
		</tr>
	</thead>
	<tbody>
		{#each games as game (game._id)}
			{#if showButtons}
			<tr>
				<td>
					<InPlaceEdit bind:value={game.home} on:submit={submit('home')} />
				</td>
				<td>
					<InPlaceEdit bind:value={game.homescore} on:submit={submit('homescore')} />
				</td>
				<td>
					<InPlaceEdit bind:value={game.awayscore} on:submit={submit('awayscore')} />
				</td>
				<td>
					<InPlaceEdit bind:value={game.away} on:submit={submit('away')} />
				</td>
				<td>
									<InPlaceEdit bind:value={game.gametime} on:submit={submit('gametime')} />
				</td>
				<td>
					<InPlaceEdit bind:value={game.gamelocation} on:submit={submit('gamelocation')} />
				</td>
				
				<td>
					<a href="#" class="ui icon button" on:click={() => gameUpdate(game)}>
						<i class="fas fa-edit"></i>
					</a>
					<a href="#" class="ui icon button" on:click={() => gameDelete(game._id)}>
						<i class="fas fa-trash"></i>
					</a>
				</td>				
			</tr>	
			{:else}
			<tr>
				<td>
					{game.home}
				</td>
				<td>
					{game.homescore}
				</td>
				<td>
					{game.awayscore}
				</td>
				<td>
					{game.away}
				</td>
				<td>
					{game.gametime}
				</td>
				<td>
					{game.gamelocation}
				</td>
			</tr>
			{/if}

			<form bind:this={deleteGame} method="POST" action="?/deletegame">
				<input bind:value={game._id} class="input mb-3" type="hidden" id="gameid" placeholder="game id" name="gameid" />
			</form>
			

			<form bind:this={updateGame} method="POST" action="?/updategame">
				<input bind:value={game._id} class="input mb-3" type="hidden" id="gameid" placeholder="game id" name="gameid" />
				<input bind:value={game.home} class="input mb-3" type="hidden" id="home-team" placeholder="home" name="home" />
				<input bind:value={game.homescore} class="input mb-3" type="hidden" id="home-score" placeholder="homescore" name="homescore" />
				<input bind:value={game.awayscore} class="input mb-3" type="hidden" id="away-score" placeholder="awayscore" name="awayscore" />
				<input bind:value={game.away} class="input mb-3" type="hidden" id="away-team" placeholder="away" name="away" />
				<input bind:value={game.gametime} class="input mb-3" type="hidden" id="game-time" placeholder="gametime" name="gametime" />
				<input bind:value={game.gamelocation} class="input mb-3" type="hidden" id="game-location" placeholder="gamelocation" name="gamelocation" />
				<input bind:value={game.clubid} class="input mb-3" type="hidden" id="club-id" placeholder="clubid" name="clubid" />
			</form>
		{/each}
	</tbody>
</table>
