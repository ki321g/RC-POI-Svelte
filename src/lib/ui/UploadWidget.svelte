<script lang="ts">
    import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
    import type { User, Club, Game, Image } from "$lib/types/rugby-club-poi-types";  
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
    // let imageNotification: String;
    // let imageNotificationColor: String

    // imageNotificationColor = "";
    // imageNotification = ""
    
    // let thumbnailURL: String;
    // let width: number;
    // let height: number;
    
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
		<a class="button controlBtn is-warning is-medium is-half is-uppercase has-text-grey" href="#" on:click={open} >
			<i class="fa-solid fa-square-plus fa-xl mr-2"></i>
			Add Image
		</a>
		<a class="button controlBtn is-danger is-medium is-uppercase is-half" href="#" >
			<i class="fas fa-trash-alt fa-xl mr-2"></i>
			Delete Image
		</a>
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
    </div> -->
</CldUploadWidget>

<form bind:this={imageForm} method="POST" action="?/addimage">
    <input bind:value={club._id} class="input mb-3" type="hidden" id="club-id" placeholder="Club Id" name="clubid" />
    <input bind:value={imageURL} class="input mb-3" type="hidden" id="image-url" placeholder="Image URL" name="img" />
</form>


    <!-- <input bind:value={width} class="input mb-3" type="hidden" id="image-width" placeholder="Image Width" name="width" />
    <input bind:value={height} class="input mb-3" type="hidden" id="image-height" placeholder="Image Height" name="height" />
    <input bind:value={thumbnailURL} class="input mb-3" type="hidden" id="image-thumbnail" placeholder="Image Thumbnail" name="thumbnail" /> -->