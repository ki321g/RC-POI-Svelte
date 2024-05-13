<script lang="ts">
	import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
	import type { User, Club, Game } from '$lib/types/rugby-club-poi-types';	  
    import { imageNotification, imageNotificationColor } from '$lib/stores';  
	import InPlaceEdit from '$lib/ui/InPlaceEdit.svelte';		
	import ImageGallery from '$lib/ui/ImageGallery.svelte';	
	import UploadWidget from '$lib/ui/UploadWidget.svelte';
	import { CldUploadWidget } from 'svelte-cloudinary';
	import { env } from '$env/dynamic/public';

	export let images: Image[] = [];
	export let club: Club[] = [];
	export let info: any;
	export let showButtons = true;


	let imageForm: any;
	let imageDelete: any;
    let imageURL: String;    
    let notification: any;
    let color: any;  
	let showImageForm = false;
	
	let error: any;
	// let selectedImage = '';
	let selectedImage = images.length > 0 ? images[0].img : '';
	let imageID = images.length > 0 ? images[0]._id : '';


	function handleImageChange(event) {
		selectedImage = event.target.value;
		let selectedImageObject = images.find(image => image.img === selectedImage);
		imageID = selectedImageObject ? selectedImageObject._id : '';
	}

	async function handleDeleteClick() {		
		const _id = imageID;
		imageDelete.elements.imageid.value = imageID;
		deleteImage(_id);
	}

	async function deleteImage(imageID: string) {
        const confirmDelete = confirm('Deleting the IMage is irreversible. Please click OK to delete the Image?');
		
		// console.log(imageID);
        if (confirmDelete) {
			try {
                
                // Submit the form
				imageDelete.submit();
            } catch (error) {
                console.log('Error deleting club');
                alert('Error deleting club');
                console.log(error);
            } 
        } else {
            alert('Delete Cancelled');
        }
    }

	function toggleForm() {
		showImageForm = !showImageForm;
	}

	const onUpload = async (result, widget) => {
		if(result.event === "success"){	
            info = result.info;            
            imageURL = info.secure_url;
            // Set the values of the form inputs
            imageForm.elements.clubid.value = club._id;
            imageForm.elements.img.value = info.secure_url;

            // Submit the form
            imageForm.submit();	            	
            
            // imageNotificationColor = "is-primary";
            // imageNotification = "Image Uploaded Successfully!"	
		}else if(result.event === "error"){	
			error = result.error;	
            // imageNotificationColor = "is-primary";
            // imageNotification = "Image Upload Error!"
			console.log(error);
		}
		widget.close();
	}

	imageNotification.subscribe(value => {
        notification = value;
    });

    imageNotificationColor.subscribe(value => {
        color = value;
    });
</script>
{#if showButtons}
	<CldUploadWidget uploadPreset="svelte-cloudinary-unsigned" let:open let:isLoading {onUpload} options={{
		sources: ['local'],
		cloudName: env.PUBLIC_CLOUDINARY_CLOUD_NAME,
		uploadPreset: env.PUBLIC_CLOUDINARY_UPLOAD_PRESET,
		folder: `clubGallery/${club._id}`,
		eager: [
			{ width: "25%", height: "25%", crop: "scale" }
		]
	}} >	

<div class="columns is-vcentered is-12">
	<div class="column is-fullwidth">
		<h2 class="title page-heading is-3 is-uppercase mb-0">Club Gallery</h2>
	</div>
	<div class="columns is-fullwidth p-4">
		<div class="column is-half">
			<button class="button controlBtn is-warning is-fullwidth is-uppercase has-text-grey"on:click={open} >
					<i class="fa-solid fa-square-plus fa-xl mr-2"></i>Add Images
			</button>
		</div>
			{#if showButtons}
			<div class="column is-half">
				<button class="button controlBtn is-danger is-uppercase" on:click={toggleForm}>
					{#if showImageForm}
					<i class="fas fa-trash-alt fa-xl mr-2"></i>Hide Delete
					{:else}
					<i class="fas fa-trash-alt fa-xl mr-2"></i>Delete Images
					{/if}
				</button>
			</div>	
			{/if}	
	</div>
</div>
	
{#if notification !== "" && color !== ""}
<div class="is-fullwidth p-1 has-text-centered has-text-weight-bold is-size-3 is-uppercase">
	<div class="notification {color} is-large">
		{notification}
	  </div>
</div>
{/if}

{#if showImageForm}	
<div class="columns is-vcentered delete-section">
	<div class="column">
	  <div class="tile is-parent is-vertical">
		<div class="tile is-child ">
			<div class="select is-fullwidth is-medium is-uppercase has-text-grey mr-2 full-width-select">
				<select class="" on:change={handleImageChange}>
				{#each images as image, index (image)}
				<option value={image.img}>Image {index + 1}</option>
				{/each}
			</select>
		  </div>
		</div>
		<div class="tile is-child">
		  <a class="button imgBtn is-danger is-fullwidth is-medium is-uppercase has-text-grey" on:click={handleDeleteClick}>Delete Image</a>
		</div>
	  </div>
	</div>
	<div class="column">
	  <div class="tile is-parent pt-0">
		<div class="tile is-child">
		  <figure class="image is-520x360">
			<div class="column">
				<div class="image-container">
					<img src={selectedImage}/>
				</div>
			</div>
		  </figure>
		</div>
	  </div>
	</div>
  </div>
<!-- <div class="columns is-vcentered">
	<div class="column">
	<div class="tile is-parent is-vertical">
		<div class="tile is-child">
	   
		<a class="button imgBtn is-warning is-fullwidth is-medium is-uppercase has-text-grey mr-2" href="" on:click={open} >Add Image</a>
		</div>
		<div class="tile is-child">
		
		<a class="button imgBtn is-danger is-fullwidth is-medium is-uppercase has-text-grey" href="/dashboard/deleteimage/">Delete Image</a>
		</div>
	</div>
	</div>
	<div class="column">
	<div class="tile is-parent">
		<div class="tile is-child">
		
		<figure class="image is-520x360">                                                    
			<div class="column">										
				{#if error}
				<div style="position: relative;">
					<img src="/images/club-image.png" alt="">
					<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5);"></div>
					<p class="has-text-danger" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; padding: 10px;">{error.status}</p>
				  </div>
				{/if}
				{#if info}
				<img width={info.width} height={info.height} src={info.secure_url} 
				alt="Uploaded Asset" />	 				
				{:else}
					<img src="/images/club-image.png" alt="">						
				{/if}
			</div>                                
		</figure>
		</div>
	</div>
	</div>
</div>  -->
{/if}

</CldUploadWidget>
{/if}

<form bind:this={imageForm} method="POST" action="?/addimage">
    <input bind:value={club._id} class="input mb-3" type="hidden" id="club-id" placeholder="Club Id" name="clubid" />
    <input bind:value={imageURL} class="input mb-3" type="hidden" id="image-url" placeholder="Image URL" name="img" />
</form>

<form bind:this={imageDelete} method="POST" action="?/deleteimage">
    <input bind:value={imageID} class="input mb-3" type="hidden" id="image-id" placeholder="Image Id" name="imageid" />
</form>

	<!-- <UploadWidget {club} />	 -->
	
<!-- <UploadWidget {club} /> -->
<ImageGallery images={images}/>


<style>
	.image-container img {
    width: 520px;
    height: 360px;
    object-fit: contain;
    border-radius: 15px; /* Rounded corners */
  }
  .delete-section {
    border: 5px solid #ff6347; /* Tomato color */
    border-radius: 15px; /* Rounded corners */
    box-shadow: 0 0 10px rgba(0,0,0,0.5); /* Shadow effect */
  }
  </style>