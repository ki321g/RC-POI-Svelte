<script lang="ts">    
    import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
    import type { User, Club, Game, Image } from '$lib/types/rugby-club-poi-types';
    import ClubGames from '$lib/ui/ClubGames.svelte'
    import ClubGallery from '$lib/ui/ClubGallery.svelte'
    import LeafletMap from '$lib/ui/LeafletMap.svelte';
    import { onMount } from 'svelte';
    import InPlaceEdit from '$lib/ui/InPlaceEdit.svelte';   
    import WeatherWidget from '$lib/ui/WeatherWidget.svelte'; 

    export let data: any;
    export let currentForecast: any;
    export let currentWeather: any;

    const clubCategories = ['JUNIOR', 'SENIOR'];
    
	let currentTab = 'Club Details';
    let clubForm: any;
    let deleteClub: any;
    let map: LeafletMap;
    let lat: any;
    let lng: any;

    onMount(async () => {       
        const leaflet = await import("leaflet");
        lat = Number(data.club.latitude);
        lng = Number(data.club.longitude);
        const popup = `
            <h1><strong>${data.club.club}</strong></h1>
            <p>${data.club.address}</p>
        `;
        if (map) {
            map.addMarker(lat, lng, popup, '', '');
        }
    });

</script>

<section class="section pt-6">


<div class="blog-posts">
    <div class="box box-link-hover-shadow">
        <div class="columns is-fullwidth p-0 mb-0">
            <div class="column has-text-left">
                <h2 class="title page-heading is-2 is-uppercase mb-0">                    
                    {data.club.club}
                </h2>
            </div>
            <div class="column has-text-right">
                <h2 class="title page-heading is-2 is-uppercase mb-0">
                    {data.club.category} Club
                </h2>
            </div>
        </div>
        <div class="columns featured-post is-multiline">
            <div class="column is-12 post">
                <article class="columns featured is-multiline is-fullwidth pt-0">
                    <figure class="column image is-520x360">
                        <div class="column is-6">
                            <LeafletMap id={data.club._id} activeLayer="Satellite" minZoom={5} zoom={16} centerOnMarker={true} height={38} bind:this={map} />
                        </div>
                    </figure>
                    <div class="column featured-content va is-6">
                        <div>
                            <h3 class="heading post-category pt-2">County</h3>
                            <h1 class="title post-title page-heading is-3 mb-3">
                                {data.club.address}
                            </h1>
                            <h3 class="heading post-category">Phone</h3>
                            <h1 class="title post-title page-heading is-3 mb-3">
                                {data.club.phone}
                            </h1>
                            <h3 class="heading post-category">Email</h3>
                            <h1 class="title post-title page-heading is-3 mb-3">
                                {data.club.email}
                            </h1>
                            <h3 class="heading post-category">website</h3>
                            <h1 class="title post-title page-heading is-3 mb-3">
                                {data.club.website}
                            </h1>
                            <div class="buttons has-addons is-fullwidth">
                                <a id="place-link-location" class="button is-half" href="https://www.google.com/maps/?q={data.club.latitude}%2C{data.club.longitude}" target="_blank"
                                    ><i class="fas fa-location-dot fa-lg mr-2"></i> View Place</a
                                >
                                <a
                                    id="place-link-directions"
                                    class="button is-half"
                                    href="https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination={data.club.latitude}%2C{data.club.longitude}"
                                    target="_blank"><i class="fas fa-route fa-lg mr-2"></i> Get Directions</a
                                >
                            </div>  
                        </div>
                    </div>
                </article>
                <div class="columns is-multiline is-fullwidth pt-0">                    
                    <div class="column is-6 pb-0 pl-6">
                        <h3 class="heading post-category">Description</h3>
                        <p class="post-excerpt">
                            {data.club.description}
                        </p>
                        <br />
                    </div>
                    <div class="column is-12 pt-0">
                        <ClubGames games={data.games} club={data.club} showButtons={false}/>                        
                        <ClubGallery images={data.images} club={data.club} showButtons={false}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</section>