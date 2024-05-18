<script lang="ts">
    import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
    import type { Club } from "$lib/types/rugby-club-poi-types";  
    import { imageNotification, imageNotificationColor } from '$lib/stores';   
	import { CldUploadWidget } from 'svelte-cloudinary';
	import { env } from '$env/dynamic/public';

	export let info: any;    
	export let club: Club[];
    export let image: Image[];

    let imageForm: any;
    let imageURL: String;    
    let notification: any;
    let color: any;   
    let showImageForm = false;    
	let error: any;

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
		}else if(result.event === "error"){	
			error = result.error;	
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

<CldUploadWidget uploadPreset="svelte-cloudinary-unsigned" let:open let:isLoading {onUpload} options={{
    sources: ['local'],
    cloudName: env.PUBLIC_CLOUDINARY_CLOUD_NAME,
    uploadPreset: env.PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    folder: `clubGallery/${club._id}`,
    eager: [
        { width: "25%", height: "25%", crop: "scale" }
    ]
}}>	
    
    {#if notification !== "" && color !== ""}
    <div class="is-fullwidth p-1 has-text-centered has-text-weight-bold is-size-3 is-uppercase">
        <div class="notification {color} is-large">
            {notification}
          </div>
    </div>
    {/if}
    <div class="buttons has-addons is-fullwidth">        
		<button class="button controlBtn is-warning is-medium is-half is-uppercase has-text-grey" on:click={open} >
			<i class="fa-solid fa-square-plus fa-xl mr-2"></i>
			Add Image
		</button>
		<button class="button controlBtn is-danger is-medium is-uppercase is-half" >
			<i class="fas fa-trash-alt fa-xl mr-2"></i>
			Delete Image
		</button>
	</div>
</CldUploadWidget>
<form bind:this={imageForm} method="POST" action="?/addimage">
    <input bind:value={club._id} class="input mb-3" type="hidden" id="club-id" placeholder="Club Id" name="clubid" />
    <input bind:value={imageURL} class="input mb-3" type="hidden" id="image-url" placeholder="Image URL" name="img" />
</form>
