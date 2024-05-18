<script lang="ts">
	import Gallery from "$lib/ui/Gallery.svelte";	  
	import ImageModal from "$lib/ui/ImageModal.svelte";  
    import type { User, Club, Game, Image } from "$lib/types/rugby-club-poi-types";   	
	import Modal, { bind } from "svelte-simple-modal";  	
	import { imageModal } from "$lib/stores.js";
    
	export let images: Image[] = [];

	function showModal(image: Image) {
		imageModal.set(bind(ImageModal, { image }));
	}

	function closeModal(e: any) {
		imageModal.set(null);
	}	

	function HandleClick(e) {
		const image = e.detail.src;
		showModal(image);
	}
	
</script>

<Modal on:close={closeModal} show={$imageModal} styleWindow={{ width: 'fit-content', maxWidth: "800px"}} />

<Gallery
	gap={15}
	maxColumnWidth={350}
	on:click={HandleClick}
	hover={true}
	loading="lazy"
>
{#each images as image}
	<img src={image.img} id={image._id} alt={image.id} />
{/each}
</Gallery>


