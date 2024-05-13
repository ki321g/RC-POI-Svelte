<script lang="ts">    
    import type { Club } from "$lib/types/rugby-club-poi-types";     
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import { onMount } from "svelte";
	  
    export let club: Club[];  
    export let id: any;

    export let map: LeafletMap;
    export let lat: any; 
    export let lng: any;

    onMount(async () => {
        // renderMAP = true;
        lat = Number(club.latitude);
        lng = Number(club.longitude);
        // console.log(lat, lng);
        // console.log("id: " + id);
        // club.forEach((club: Club) => {
        // map.addMarker(Number(club.latitude), Number(club.longitude), club.club.toString());
        if (map) {
            map.addMarker(lat, lng, 'TEST');
        }
        // });
    });

  </script>

<LeafletMap height={37} bind:this={map} id={id} zoom={14} />