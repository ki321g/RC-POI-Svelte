<script lang="ts">
    import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
    import type { User, Club, Game, Image } from "$lib/types/rugby-club-poi-types";     
	import { CldUploadWidget } from 'svelte-cloudinary';
	import { env } from '$env/dynamic/public';

	export let info: any;    
	export let club: Club[];
    export let image: Image[];
    let imageURL: String;
    let imageForm: any;
	let error: any;


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
</script>

<CldUploadWidget uploadPreset="svelte-cloudinary-unsigned" let:open let:isLoading {onUpload} options={{
    sources: ['local'],
    cloudName: env.PUBLIC_CLOUDINARY_CLOUD_NAME,
    uploadPreset: env.PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    folder: `clubGallery/${club._id}`
}}>	
    <div class="columns is-vcentered">
        <div class="column">
        <div class="tile is-parent is-vertical">
            <div class="tile is-child">
            <!-- Content for first row in first column -->
            <a class="button imgBtn is-warning is-fullwidth is-medium is-uppercase has-text-grey mr-2" href="" on:click={open}>Upload Image</a>
            </div>
            <div class="tile is-child">
            <!-- Content for second row in first column -->
            <a class="button imgBtn is-danger is-fullwidth is-medium is-uppercase has-text-grey" href="/dashboard/deleteimage/">Delete Image</a>
            </div>
        </div>
        </div>
        <div class="column">
        <div class="tile is-parent">
            <div class="tile is-child">
            <!-- Content for the row in second column -->
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
                    <img width={info.width} height={info.height} src={info.secure_url} alt="Uploaded Asset" />					
                    {:else}
                        <img src="/images/club-image.png" alt="">						
                    {/if}
                </div>                                
            </figure>   
            </div>
        </div>
        </div>
    </div>
</CldUploadWidget>

<form bind:this={imageForm} method="POST" action="?/addimage">
    <input bind:value={club._id} class="input mb-3" type="hidden" id="club-id" placeholder="Club Id" name="clubid" />
    <input bind:value={imageURL} class="input mb-3" type="hidden" id="image-url" placeholder="Image URL" name="img" />
</form>