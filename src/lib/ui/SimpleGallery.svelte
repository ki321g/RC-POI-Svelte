<script lang="ts">
    // @ts-ignore
    import PhotoSwipeLightbox from 'photoswipe/lightbox'; 
    import 'photoswipe/style.css'    
    import type { User, Club, Game, Image } from "$lib/types/rugby-club-poi-types";     
    import { onMount } from "svelte";;
    export let galleryID;
    export let images;
    
    onMount(() => {
        let lightbox = new PhotoSwipeLightbox({
          gallery: '#' + galleryID,
          children: 'a',
          pswpModule: () => import('photoswipe'),
        });
        lightbox.init();})
      </script>
    
        <div class="pswp-gallery" id={galleryID}>
          {#if images}
          {#each images as image}
        <a
              href={image.largeURL}
              data-pswp-width={image.width}
              data-pswp-height={image.height}
              target="_blank"
              rel="noreferrer"
            >
              <img src={image.thumbnailURL} alt="" />
              </a>
        {/each}
        {/if}
        </div>
    