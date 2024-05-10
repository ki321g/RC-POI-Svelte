div<script lang="ts">
    import LeafletMap from '$lib/ui/LeafletMap.svelte';
	import type { User, Club, Game, DataSet, DataSetGames } from '$lib/types/rugby-club-poi-types';
	import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';    	
	import SelectedClub from '$lib/ui/SelectedClub.svelte';	
	import { onMount } from 'svelte';

    export let data: any;
    let map: LeafletMap;
    let location = { lat: 53.1424, lng: -7.6921 }; // replace with your actual location    
    let counties:any;

    export let clubs: Club[] = data.clubs;

    onMount(async () => {
        let totalLat = 0;
        let totalLng = 0;

		const leaflet = await import("leaflet");

        counties = Array.from(new Set(Object.values(data.clubs).map(club => club.address)));
        
        clubs.forEach((club: Club) => {
            const popup = `
            <h1><strong>${club.club}</strong></h1>
            <p>${club.address}</p>
        `;
        totalLat += Number(club.latitude);
        totalLng += (club.longitude);
        map.addMarker(Number(club.latitude), Number(club.longitude), popup, club);        
        });

        const centerLat = totalLat / clubs.length;
        const centerLng = totalLng / clubs.length;
        location = { lat: centerLat, lng: centerLng };
        // console.log(location);
	});
</script>

<section class="section pt-6">
    <!-- <pre>{counties}</pre>
    <pre>{JSON.stringify(counties, null, 2)}</pre> --> 
    <div class="blog-posts">
        <div class="box box-link-hover-shadow">
            <div class="columns featured-post is-multiline">
                <div class="column is-12 post">
                    <LeafletMap allowCategories={true} height={80} width={130} minZoom={5} zoom={7} {location} bind:this={map} />
                </div>
            </div>
        </div>
    </div>
    <div id="hiddenClub" >
        <SelectedClub clubs={clubs}/>
    </div>
</section>

