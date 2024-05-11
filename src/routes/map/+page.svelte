div<script lang="ts">
    import LeafletMap from '$lib/ui/LeafletMap.svelte';
	import type { User, Club, Game, DataSet, DataSetGames } from '$lib/types/rugby-club-poi-types';
	import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';    	
	import SelectedClub from '$lib/ui/SelectedClub.svelte';	
	import { onMount, onDestroy } from 'svelte';  

    export let data: any;
    let map: LeafletMap;
    let location = { lat: 53.1424, lng: -7.6921 }; // replace with your actual location    
    let counties:any;
    let showButton = false;

    export let clubs: Club[] = data.clubs;

    function scrollToTop() {
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        });
    }


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
        map.addMarker(Number(club.latitude), Number(club.longitude), popup, club, true);        
        });

        const centerLat = totalLat / clubs.length;
        const centerLng = totalLng / clubs.length;
        location = { lat: centerLat, lng: centerLng };
        // console.log(location);

        const checkScroll = () => {
        showButton = window.pageYOffset > 200;
        };

        window.addEventListener('scroll', checkScroll);
        checkScroll();

        return () => {
        window.removeEventListener('scroll', checkScroll);
        };
	});
</script>

{#if showButton}
  <div id="back-to-top" class="button button-font is-uppercase" on:click={scrollToTop}>Back to Top</div>
{/if}
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

<style>
    #back-to-top {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: hsl(171, 100%, 41%);
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      color: white;
    }
  </style>