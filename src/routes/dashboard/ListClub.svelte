<script lang="ts">    
    import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
    import type { Club } from "$lib/types/rugby-club-poi-types";     
	import UploadWidget from './UploadWidget.svelte';
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import SimpleGallery from '$lib/ui/SimpleGallery.svelte'
    import { onMount } from "svelte";
    // let renderMAP: boolean = false;
	  
    export let club: Club[];

    let map: LeafletMap;
    let lat: any; 
    let lng: any;
    
    const images = [
            {
              largeURL:
                'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg',
              thumbnailURL:
                'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg',
              width: 1875,
              height: 2500,
            },
            {
              largeURL:
                'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg',
              thumbnailURL:
                'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg',
              width: 1669,
              height: 2500,
            },
            {
              largeURL:
                'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg',
              thumbnailURL:
                'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg',
              width: 2500,
              height: 1666,
            },
          ]

    onMount(async () => {        
        // renderMAP = true;
        lat = Number(club.latitude);
        lng = Number(club.longitude);
        console.log(lat, lng);
        // club.forEach((club: Club) => {
        // map.addMarker(Number(club.latitude), Number(club.longitude), club.club.toString());
        if (map) {
            map.addMarker(lat, lng, 'TEST');
        }
        // });
    });

  </script>


<div class="blog-posts">
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
                            
                            <LeafletMap height={36} bind:this={map} />  
                            
                        </div>
                    </figure>
                    <div class="column featured-content va">
                        <div>
                            <h3 class="heading post-category">County</h3>
                            <h1 class="title post-title page-heading is-3 mb-3">{club.address}</h1>
                            <h3 class="heading post-category">Phone</h3>
                            <h1 class="title post-title page-heading is-3 mb-3">{club.phone}</h1>
                            <h3 class="heading post-category">Email</h3>
                            <h1 class="title post-title page-heading is-3 mb-3">{club.email}</h1>
                            <h3 class="heading post-category">website</h3>
                            <h1 class="title post-title page-heading is-3 mb-3">{club.website}</h1>                                      
                            <div class="buttons has-addons is-fullwidth">
                                <a id="place-link-location" class="button is-half" href="https://www.google.com/maps/?q={club.latitude}%2C{club.longitude}"
                                    target="_blank"><i class="fas fa-location-dot fa-lg mr-2"></i> View Place</a>
                                <a id="place-link-directions" class="button is-half" href="https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination={club.latitude}%2C{club.longitude}"
                                    target="_blank"><i class="fas fa-route fa-lg mr-2"></i> Get Directions</a>
                            </div>
                        </div>

                    </div>
                    <div class="column is-12 pb-0">
                        <h3 class="heading post-category">Description</h3>
                        <p class="post-excerpt">{club.description}</p>
                        <br>
                    </div>       
                    <div class="column is-12 pt-0">
                        <div class="buttons has-addons is-fullwidth">
                            <a class="button controlBtn is-warning is-medium is-third is-uppercase has-text-grey"href="/dashboard/editclub/{club._id}">
                                <i class="fas fa-edit fa-xl mr-2"></i>
                                Edit Club
                            </a>
                            <a class="button controlBtn is-warning is-medium is-third is-uppercase has-text-grey" href="/club/{club._id}">
                                <i class="fas fa-edit fa-xl mr-2" href="/club/{club._id}"></i>
                                View/Edit Games
                            </a>
                            <a class="button controlBtn is-danger is-medium is-uppercase is-third" href="/dashboard/deleteclub/{club._id}">
                                <i class="fas fa-trash-alt fa-xl mr-2"></i>
                                Delete Club
                            </a>
                        </div>                                   
                    </div>
                </article>
            </div>
        </div>
        
    </div>   
</div>  

<div class="blog-posts">
    <div class="box box-link-hover-shadow">
        <div class="columns is-fullwidth p-0 mb-0">
            <div class="column has-text-left">
                <h2 class="title page-heading is-2 is-uppercase mb-0">
                    Club Gallery
                </h2>
            </div>
            <div class="column has-text-right">
                <h2 class="title page-heading is-2 is-uppercase mb-0">
                    
                </h2>
            </div>
        </div>                    
        <div class="columns featured-post is-multiline">
            <div class="column is-12 post">
                <article class="columns featured is-multiline pt-0">
                        <div class="column is-12">                            
                            <!-- MAP WAS HERE -->
                            <UploadWidget club={club} />
                        </div>
                    <div class="column is-12 pb-0">
                        <!-- BELLOW MAP WAS HERE -->
                    </div>       
                    <div class="column is-12 pt-0">
                        <div class="is-fullwidth">
                           <!-- GALLERY GOES HERE -->
                           <SimpleGallery galleryID="my-test-gallery" {images} />
                        </div>                                   
                    </div>
                </article>
            </div>
        </div>        
    </div>   
</div>  