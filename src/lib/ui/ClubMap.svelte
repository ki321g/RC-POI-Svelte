<script lang="ts">    
    import type { Club } from "$lib/types/rugby-club-poi-types";     
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import { onMount } from "svelte";
	  
    export let club: Club[] = [];
    export let id: any;
    export let lat: any; 
    export let lng: any;

    let map: LeafletMap;

    onMount(async () => {        	
		    let popup = ""
        const leaflet = await import("leaflet");        
        
        if (map) {
              map.addMarker(Number(lat), Number(lng), popup, '', false);
          }
    });
  </script>

<LeafletMap centerOnMarker={true} height={37} activeLayer="Satellite" minZoom={5} zoom={16} bind:this={map} id={id} />