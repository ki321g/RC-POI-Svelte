<script lang="ts">
    import LeafletMap from '$lib/ui/LeafletMap.svelte';
	import type { User, Club, Game, DataSet, DataSetGames } from '$lib/types/rugby-club-poi-types';
	import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
	import { onMount } from 'svelte';

    // export let clubs: Club[] = [];
    export let data: any;
    let map: LeafletMap;
    let location = { lat: 53.1424, lng: -7.6921 }; // replace with your actual location    


    onMount(async () => {
        let totalLat = 0;
        let totalLng = 0;

		const leaflet = await import("leaflet");
        const clubs = data.clubs;
        
        clubs.forEach((club: Club) => {
            const popup = `
            <h1><strong>${club.club}</strong></h1>
        `;
        totalLat += Number(club.latitude);
        totalLng += (club.longitude);
        map.addMarker(Number(club.latitude), Number(club.longitude), popup, club.category);
        });

        const centerLat = totalLat / clubs.length;
        const centerLng = totalLng / clubs.length;
        location = { lat: centerLat, lng: centerLng };
        console.log(location);
        // map.moveTo(49.15, -5.112);
        // map.moveTo(location.lat, location.lng);
	});
</script>

<section class="section">
    <LeafletMap allowCategories={true} height={80} width={80} minZoom={5} zoom={7} {location} bind:this={map} />
    <!-- 
        location.lat={53.1424} long={-7.6921 }
        <LeafletMap height={80} width={130} minZoom={5} zoom={7} location={{ lat: 53.1424, lng: -7.6921 }} bind:this={map} /> -->
</section>