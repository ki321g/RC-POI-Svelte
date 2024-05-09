<script lang="ts">
    import LeafletMap from '$lib/ui/LeafletMap.svelte';
	import type { User, Club, Game, DataSet, DataSetGames } from '$lib/types/rugby-club-poi-types';
	import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
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
        map.addMarker(Number(club.latitude), Number(club.longitude), popup, club.category, club.address);
        });

        const centerLat = totalLat / clubs.length;
        const centerLng = totalLng / clubs.length;
        location = { lat: centerLat, lng: centerLng };
        // console.log(location);
	});
</script>

<section class="section">
    <!-- <pre>{counties}</pre>
    <pre>{JSON.stringify(counties, null, 2)}</pre> -->
    <LeafletMap allowCategories={true} height={80} width={80} minZoom={5} zoom={7} {location} bind:this={map} />
</section>