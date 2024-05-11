<script lang="ts">
    import { onMount } from 'svelte';
    import ClubMap from "$lib/ui/ClubMap.svelte";
    import type { Club } from "$lib/types/rugby-club-poi-types"; 

    export let data: any;
    export let clubs: Club[] = data.clubs;   

    onMount(() => {   
        
        setTimeout(() => {            
            const hideAddressDivs = document.querySelectorAll('div[data-address]');
            hideAddressDivs.forEach(div => div.hidden = true);

            const hideEmptySpace = document.getElementById('empty-space');
            hideEmptySpace.hidden = true;
        
        }, 1000);
    });
</script>

<div id="empty-space" class="empty-space"></div>
<style>
    #empty-space {
      height: 10000px; /* Replace with the height you want */
    }
  </style>
{#each clubs as club (club._id)}
<div id="{club.address}" class="blog-posts" data-address="{club.address}">
    <div class="box box-link-hover-shadow">
        <div class="columns is-fullwidth p-0 mb-0">
            <div class="column has-text-left">
                <h2 class="title page-heading is-2 is-uppercase mb-0">
                    {club.club} 
                </h2>
            </div>
            <div class="column has-text-right">
                <h2 class="title page-heading is-2 is-uppercase mb-0">
                    {club.category} Club
                </h2>
            </div>
        </div>                    
        <div class="columns featured-post is-multiline">
            <div class="column is-12 post">
                <article class="columns featured is-multiline pt-0">
                    <figure class="image is-520x360">
                        <div class="column">
                            <!-- <ClubMap club={club} id={club.club} /> -->
                            <ClubMap club={club} id={club._id} lat={club.latitude} lng={club.longitude}/>
                        </div>
                    </figure> 
                    <div class="column featured-content va">
                        <div>
                            <h3 class="heading post-category">County</h3>
                            <h1 class="title post-title page-content is-3 mb-3">{club.address}</h1>
                            <h3 class="heading post-category">Phone</h3>
                            <h1 class="title post-title page-content is-3 mb-3">{club.phone}</h1>
                            <h3 class="heading post-category">Email</h3>
                            <h1 class="title post-title page-content is-3 mb-3">{club.email}</h1>
                            <h3 class="heading post-category">website</h3>
                            <h1 class="title post-title page-content is-3 mb-3">{club.website}</h1>
                            <div class="buttons has-addons is-fullwidth">
                                <a id="place-link-location" class="button is-half" href="https://www.google.com/maps/?q={club.latitude}%2C{club.longitude}"
                                    target="_blank"><i class="fas fa-location-dot fa-xl mr-2"></i> View Place</a>
                                <a id="place-link-directions" class="button is-half" href="https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination={club.latitude}%2C{club.longitude}"
                                    target="_blank"><i class="fas fa-route fa-xl mr-2"></i> Get Directions</a>
                            </div>
                        </div>
                    </div>
                    <div class="column is-12 pb-0">
                        <h3 class="heading post-category">Description</h3>
                        <p class="post-excerpt">{club.description}</p>
                        <br>
                    </div>
                    <a class="button view-club-details is-success is-outlined is-medium is-fullwidth has-addons mb-0" href="/clubs/clubdetails/{club._id}"><i class="fas fa-location-dot fa-xl mr-2"></i> View Club Details</a>
                </article>
            </div>
        </div>
    </div>
</div> 
{/each}
