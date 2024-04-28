<script lang="ts">
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { goto } from '$app/navigation';

	let apiKey = env.PUBLIC_GOOGLE_API_KEY;
	let service: google.maps.places.PlacesService;
	let searchBox: HTMLInputElement;
	let searchResults: HTMLSelectElement;
	let selectedPlace: google.maps.places.PlaceResult | null = null;

	let club = '';
	let address = '';
	let phone = '';
	let website = '';
	let latitude = '';
	let longitude = '';
	let email = '';
	let category = '';
	let description = '';
	let errorMessage = '';
	let searchBoxValue = '';
	console.log(apiKey);

	const handleSearch = () => {
		searchResults.innerHTML = '';
		searchBoxValue = searchBox.value;
		if (!searchBoxValue) {
			return;
		}
		const request = {
			query: searchBoxValue
		};
		service.textSearch(request, (results, status) => {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				for (const place of results) {
					const option = document.createElement('option');
					option.value = JSON.stringify(place);
					option.textContent = place.name;
					searchResults.appendChild(option);
				}
			} else {
				console.error('Places search failed:', status);
			}
		});
	};

	onMount(() => {
		service = new google.maps.places.PlacesService(document.createElement('div'));
		searchBox = document.getElementById('search-box') as HTMLInputElement;
		searchResults = document.getElementById('search-results') as HTMLSelectElement;

		searchBox.addEventListener('keyup', (event: KeyboardEvent) => {
			//   searchBoxValue = (event.target as HTMLInputElement).value;
			handleSearch();
		});

		// Call the search handler when the page first loads
		handleSearch();

		searchResults.addEventListener('change', () => {
			selectedPlace = JSON.parse(searchResults.value);
			// rest of the code...
		});
	});
</script>

<h1 class="title page-heading is-2 is-uppercase mb-3">No Clubs</h1>

<form action="/dashboard/addclub" method="POST">
	<div class="field-body">
		<div class="container">
			<div class="columns is-vcentered">
				<div class="column has-text-centered is-5">
					<input class="input mb-3" type="text" id="search-box" value="Rugby" placeholder="Search for Places" />
					<select class="mb-3" id="search-results" multiple></select>
				</div>
				<div class="column is-8 is-left">
					<div id="map"></div>
				</div>
			</div>
			<div class="columns is-vcentered is-12">
				<div class="column has-text-centered">
					<div class="columns is-multiline is-vcentered">
						<div class="column has-text-centered is-4 pb-0">
							<div class="field">
								<input bind:value={club} class="input mb-3" type="text" id="place-name" placeholder="Place Name" name="club" />
							</div>

							<div class="field">
								<input bind:value={address} class="input mb-3" type="text" id="place-county" placeholder="Place County" name="address" />
							</div>
						</div>
						<div class="column has-text-centered is-4 pb-0">
							<div class="field">
								<input bind:value={phone} class="input mb-3" type="text" id="place-phone" placeholder="Phone Number" name="phone" />
							</div>

							<div class="field">
								<input bind:value={website} class="input mb-3" type="text" id="place-website" placeholder="Website" name="website" />
							</div>
						</div>
						<div class="column has-text-centered is-4 pb-0">
							<div class="field">
								<input bind:value={latitude} class="input mb-3" type="text" id="place-lat" placeholder="Latitude" name="latitude" />
							</div>

							<div class="field">
								<input bind:value={longitude} class="input mb-3" type="text" id="place-lng" placeholder="Longitude" name="longitude" />
							</div>
						</div>
						<div class="column has-text-centered is-6 pt-0 pb-0">
							<div class="field">
								<input bind:value={email} class="input mb-3" type="text" id="place-email" placeholder="Email" name="email" />
							</div>
						</div>
						<div class="column has-text-centered is-6 pt-0 pb-0">
							<div class="field">
								<div class="select mb-3 is-fullwidth">
									<select bind:value={category} id="place-category" name="category">
										<option value="">Select Category</option>
										<option value="Junior">Junior</option>
										<option value="Senior">Senior</option>
									</select>
								</div>
							</div>
						</div>
						<div class="column has-text-centered is-12 pt-0">
							<div class="field">
								<textarea bind:value={description} class="textarea" rows="5" placeholder="Enter description here..." name="description"></textarea>
							</div>
							<button class="button is-primary is-large is-fullwidth is-large m-3 p-4">Add Club</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>
