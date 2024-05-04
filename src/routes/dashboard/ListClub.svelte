<script lang="ts">
	import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
	import type { User, Club, Game } from '$lib/types/rugby-club-poi-types';
	import UploadWidget from './UploadWidget.svelte';
    import ClubGames from './ClubGames.svelte'
    import ClubGallery from './ClubGallery.svelte'
	import LeafletMap from '$lib/ui/LeafletMap.svelte';
	import SimpleGallery from '$lib/ui/SimpleGallery.svelte';
	import { onMount } from 'svelte';
	import InPlaceEdit from '$lib/ui/InPlaceEdit.svelte';
	// let renderMAP: boolean = false;

	export let club: Club[] = [];
    export let games: Game[] = [];
	// let editState: Record<string, Club> = {};
	// let collapseState: Record<string, boolean> = {};
	const clubCategories = ['JUNIOR', 'SENIOR'];

	let clubForm: any;
    let deleteClub: any;
	// let editedClub: Record<string, Club> = {};

	// let clubid: any;
	// let address: any;
	// let phone: any;
	// let
	let map: LeafletMap;
	let lat: any;
	let lng: any;

	const images = [
		{
			largeURL: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg',
			thumbnailURL: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg',
			width: 1875,
			height: 2500
		},
		{
			largeURL: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg',
			thumbnailURL: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg',
			width: 1669,
			height: 2500
		},
		{
			largeURL: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg',
			thumbnailURL: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg',
			width: 2500,
			height: 1666
		}
	];

	onMount(async () => {
		// renderMAP = true;
		lat = Number(club.latitude);
		lng = Number(club.longitude);
		console.log(lat, lng);
        console.log(games);
		// club.forEach((club: Club) => {
		// map.addMarker(Number(club.latitude), Number(club.longitude), club.club.toString());
		if (map) {
			map.addMarker(lat, lng, 'TEST');
		}
	});

	// function submit(field: string | number) {
	//     return ({detail: newValue}: {detail: any}) => {
	//         editState[field] = newValue;
	//         // IRL: POST value to server here
	// 	    console.log(`updated ${field}, new value is: "${newValue}"`)
	//     };
	// }
	// function submit(field) {
	//     return ({detail: newValue}) => {
	//         // IRL: POST value to server here
	//         console.log(`updated ${field}, new value is: "${newValue}"`)
	//     }
	// }
	function submit(field) {
		return ({ detail: newValue }) => {
			// IRL: POST value to server here
			console.log(`updated ${field}, new value is: "${newValue}"`);
		};
	}

	async function clubUpdate(club: Club) {
		const confirmUpdate = confirm('Your Updating this Club. Please click OK to continue?');
		// editedClub = club;
		// console.log(editedClub);
		// Set the values of the form inputs
		if (confirmUpdate) {
			try {
				console.log('Updating club...clubUpdate');
				console.log(club);
				clubForm.elements.clubid.value = club._id;
				clubForm.elements.club.value = club.club;
				clubForm.elements.address.value = club.address;
				clubForm.elements.phone.value = club.phone;
				clubForm.elements.email.value = club.email;
				clubForm.elements.website.value = club.website;
				clubForm.elements.latitude.value = club.latitude;
				clubForm.elements.longitude.value = club.longitude;
				clubForm.elements.description.value = club.description;
				clubForm.elements.category.value = club.category;
				clubForm.elements.img.value = club.img;
				clubForm.elements.userId.value = club.userId;

				console.log(clubForm.elements.clubid.value);
				console.log(clubForm.elements.club.value);
				console.log(clubForm.elements.address.value);
				console.log(clubForm.elements.phone.value);
				console.log(clubForm.elements.email.value);
				console.log(clubForm.elements.website.value);
				console.log(clubForm.elements.latitude.value);
				console.log(clubForm.elements.longitude.value);
				console.log(clubForm.elements.description.value);
				console.log(clubForm.elements.category.value);
				console.log(clubForm.elements.img.value);
				console.log(clubForm.elements.userId.value);

				// Submit the form
				clubForm.submit();
			} catch (error) {
				console.log('Error updating club');
				alert('Error updating club');
				console.log(error);
			} 
		} else {
            alert('Update Cancelled');
        }
	}

    async function clubDelete(club: Club) {
        const confirmDelete = confirm('Deleting the Club is irreversible. Please click OK to delete this Club?');
		console.log(club);
        if (confirmDelete) {
			try {
                deleteClub.elements.clubid.value = club._id;
                // Submit the form
				deleteClub.submit();
            } catch (error) {
                console.log('Error deleting club');
                alert('Error deleting club');
                console.log(error);
            } 
        } else {
            alert('Delete Cancelled');
        }
    }
	// onMount(() => {
	//     club.forEach(club => {
	//     collapseState[club._id] = false;
	//     editState[club._id] = { ...club};
	//     });
	// });
</script>

<div class="blog-posts">
	<div class="box box-link-hover-shadow">
		<div class="columns is-fullwidth p-0 mb-0">
			<div class="column has-text-left">
				<h2 class="title page-heading is-2 is-uppercase mb-0">
					<InPlaceEdit bind:value={club.club} on:submit={submit('club')} />
					<!-- {club.club} -->
				</h2>
			</div>
			<div class="column has-text-right">
				<h2 class="title page-heading is-2 is-uppercase mb-0">
					<InPlaceEdit bind:value={club.category} on:submit={submit('category')} categoryField={true} {clubCategories} />
					<!-- {club.category}  Club -->
				</h2>
			</div>
		</div>
		<div class="columns featured-post is-multiline">
			<div class="column is-12 post">
				<article class="columns featured is-multiline is-fullwidth pt-0">
					<figure class="image is-520x360">
						<div class="column is-6">
							<LeafletMap height={36} bind:this={map} />
						</div>
					</figure>
					<div class="column featured-content va is-6">
						<div>
							<h3 class="heading post-category">County</h3>
							<h1 class="title post-title page-heading is-3 mb-3">
								<InPlaceEdit bind:value={club.address} on:submit={submit('address')} />
								<!-- {club.address} -->
							</h1>
							<h3 class="heading post-category">Phone</h3>
							<h1 class="title post-title page-heading is-3 mb-3">
								<InPlaceEdit bind:value={club.phone} on:submit={submit('phone')} />
								<!-- {club.phone} -->
							</h1>
							<h3 class="heading post-category">Email</h3>
							<h1 class="title post-title page-heading is-3 mb-3">
								<InPlaceEdit bind:value={club.email} on:submit={submit('email')} />
								<!-- {club.email} -->
							</h1>
							<h3 class="heading post-category">website</h3>
							<h1 class="title post-title page-heading is-3 mb-3">
								<InPlaceEdit bind:value={club.website} on:submit={submit('website')} />
								<!-- {club.website} -->
							</h1>
							<div class="buttons has-addons is-fullwidth">
								<a id="place-link-location" class="button is-half" href="https://www.google.com/maps/?q={club.latitude}%2C{club.longitude}" target="_blank"
									><i class="fas fa-location-dot fa-lg mr-2"></i> View Place</a
								>
								<a
									id="place-link-directions"
									class="button is-half"
									href="https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination={club.latitude}%2C{club.longitude}"
									target="_blank"><i class="fas fa-route fa-lg mr-2"></i> Get Directions</a
								>
							</div>
						</div>
					</div>
					<div class="column is-3 pb-0">
						<h3 class="heading post-category">longitude</h3>
						<p class="post-excerpt">
							<InPlaceEdit bind:value={club.longitude} on:submit={submit('longitude')} />
							<!-- {club.description} -->
						</p>
					</div>
					<div class="column is-3 pb-0">
						<h3 class="heading post-category">latitude</h3>
						<p class="post-excerpt">
							<InPlaceEdit bind:value={club.latitude} on:submit={submit('latitude')} />
							<!-- {club.description} -->
						</p>
					</div>
					<div class="column is-6 pb-0">
						<h3 class="heading post-category">Description</h3>
						<p class="post-excerpt">
							<InPlaceEdit bind:value={club.description} on:submit={submit('description')} />
							<!-- {club.description} -->
						</p>
						<br />
					</div>
					<div class="column is-12 pt-0">
						<div class="buttons has-addons is-fullwidth">
							<a class="button controlBtn is-warning is-medium is-half is-uppercase has-text-grey" href="#" on:click={() => clubUpdate(club)}>
								<i class="fas fa-edit fa-xl mr-2"></i>
								Edit Club
							</a>
							<!-- <a class="button controlBtn is-warning is-medium is-third is-uppercase has-text-grey" href="/club/{club._id}">
								<i class="fas fa-edit fa-xl mr-2" href="#"></i>
								View/Edit Games
							</a> -->
                            <!-- button controlBtn is-warning is-medium is-third is-uppercase has-text-grey -->
							<a class="button controlBtn is-danger is-medium is-uppercase is-half" href="#" on:click={() => clubDelete(club)}>
								<i class="fas fa-trash-alt fa-xl mr-2"></i>
								Delete Club
							</a>
						</div>
                        <!-- <ClubGames games={games}/> : <h1>No Games</h1> -->
                    <ClubGames games={games} club={club} />
                    <ClubGallery />
					</div>
				</article>
			</div>
		</div>
	</div>
</div>

<div class="blog-posts">
	<div class="box box-link-hover-shadow">
		<div class="columns is-fullwidth p-0 mb-0">
			<div class="column has-text-left">
				<h2 class="title page-heading is-2 is-uppercase mb-0">Club Gallery</h2>
			</div>
			<div class="column has-text-right">
				<h2 class="title page-heading is-2 is-uppercase mb-0"></h2>
			</div>
		</div>
		<div class="columns featured-post is-multiline">
			<div class="column is-12 post">
				<article class="columns featured is-multiline pt-0">
					<div class="column is-12">
						<!-- MAP WAS HERE -->
						<UploadWidget {club} />
					</div>
					<div class="column is-12 pb-0">
						<!-- BELLOW MAP WAS HERE -->
					</div>
					<div class="column is-12 pt-0">
						<div class="is-fullwidth">
							<!-- GALLERY GOES HERE -->
							<SimpleGallery galleryID="my-test-gallery" {images} />
						</div>
					</div>
				</article>
			</div>
		</div>
	</div>
</div>

<form bind:this={clubForm} method="POST" action="?/updateclub">
	<input bind:value={club._id} class="input mb-3" type="hidden" id="clubid" placeholder="club id" name="clubid" />
	<input bind:value={club.club} class="input mb-3" type="hidden" id="club-name" placeholder="club" name="club" />
	<input bind:value={club.address} class="input mb-3" type="hidden" id="add" placeholder="address" name="address" />
	<input bind:value={club.phone} class="input mb-3" type="hidden" id="tel" placeholder="phone" name="phone" />
	<input bind:value={club.email} class="input mb-3" type="hidden" id="em" placeholder="email" name="email" />
	<input bind:value={club.website} class="input mb-3" type="hidden" id="web" placeholder="website" name="website" />
	<input bind:value={club.latitude} class="input mb-3" type="hidden" id="lat" placeholder="latitude" name="latitude" />
	<input bind:value={club.longitude} class="input mb-3" type="hidden" id="long" placeholder="longitude" name="longitude" />
	<input bind:value={club.description} class="input mb-3" type="hidden" id="desc" placeholder="description" name="description" />
	<input bind:value={club.category} class="input mb-3" type="hidden" id="cat" placeholder="category" name="category" />
	<input bind:value={club.img} class="input mb-3" type="hidden" id="images" placeholder="images" name="img" />
	<input bind:value={club.userId} class="input mb-3" type="hidden" id="user-id" placeholder="User Id" name="userId" />
</form>

<form bind:this={deleteClub} method="POST" action="?/deleteclub">
    <input bind:value={club._id} class="input mb-3" type="hidden" id="clubid" placeholder="club id" name="clubid" />
</form>