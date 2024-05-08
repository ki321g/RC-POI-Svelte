<script lang="ts">    
    import type { Club } from "$lib/types/rugby-club-poi-types";     
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import { onMount } from "svelte";
	  
    // export let club: Club[] = [];
    export let id: any;

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
        if (map) {
            map.addMarker(Number(lat), Number(lng), 'TEST', '');
        }
        // });
    });
  </script>

<LeafletMap centerOnMarker={true} height={37} bind:this={map} id={id} zoom={14} />
<!-- <LeafletMap height={37} bind:this={map} id={id} zoom={14} on:mount={() => {
    if (map) {
      map.addMarker(Number(lat), Number(lng), 'TEST', '');
    }
  }} /> -->