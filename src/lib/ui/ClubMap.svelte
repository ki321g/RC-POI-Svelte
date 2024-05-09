<script lang="ts">    
    import type { Club } from "$lib/types/rugby-club-poi-types";     
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import { onMount } from "svelte";
	  
    // export let club: Club[] = [];
    export let id: any;
    export let club: Club;

    let map: LeafletMap;
    export let lat: any; 
    export let lng: any;

    onMount(async () => {
        	
		const leaflet = await import("leaflet");
        // renderMAP = true;
        //  lat = Number(lat);
        //  lng = Number(lng);
        console.log(lat, lng);
        // console.log("id: " + id);
        // club.forEach((club: Club) => {
        // map.addMarker(Number(club.latitude), Number(club.longitude), club.club.toString());
        const popup = `
            <h1><strong>${club.club}</strong></h1>
            <p>${club.address}</p>
        `;
        if (map) {
            map.addMarker(Number(lat), Number(lng), popup, '', '');
        }
        // });
    });
  </script>

<LeafletMap centerOnMarker={true} height={37} activeLayer="Satellite" minZoom={5} zoom={16} bind:this={map} id={id} />
<!-- <LeafletMap height={37} bind:this={map} id={id} zoom={14} on:mount={() => {
    if (map) {
      map.addMarker(Number(lat), Number(lng), 'TEST', '');
    }
  }} /> -->