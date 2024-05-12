<script lang="ts">    
    import type { Club } from "$lib/types/rugby-club-poi-types";     
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import { onMount } from "svelte";
  // import ForecastTemp from "$lib/ForecastTemp/ForecastTemp.svelte";
  // import CurrentTemp from "$lib/CurrentTemp/CurrentTemp.svelte";  
  // import { generateReading, generateForecast } from '$lib/utilities/openweathermap-utils';
	  
    export let club: Club[] = [];
    export let id: any;
    export let lat: any; 
    export let lng: any;

    let map: LeafletMap;

    onMount(async () => {        	
		    let popup = ""
        const leaflet = await import("leaflet");
        // console.log(lat, lng);
        // console.log(id)
        if (club) {
          popup = `
              <h1><strong>${club.club}</strong></h1>
              <p>${club.address}</p>
          `;
        }
        
        if (map) {
              map.addMarker(Number(lat), Number(lng), popup, '', club, false);
          }
    });
  </script>

<LeafletMap centerOnMarker={true} height={37} activeLayer="Satellite" minZoom={5} zoom={16} bind:this={map} id={id} />