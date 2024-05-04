<script lang="ts">    
    // import { fetch } from '@sveltejs/kit/fetch';
    import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
    import type { User, Club, Game, Image } from "$lib/types/rugby-club-poi-types";     
	import { CldUploadWidget } from 'svelte-cloudinary';
	import { env } from '$env/dynamic/public';
	// import { env } from '$env/static/public';
	// import { PUBLIC_CLOUDINARY_UPLOAD_PRESET, VITE_PUBLIC_CLOUDINARY_CLOUD_NAME } from '$env/static/public'

	let info: any;
	let error: any;

	export let club: Club[];
    export let image: Image[];

	const onUpload = async (result, widget) => {
		if(result.event === "success"){
			info = result.info;
			console.log(info);
            console.log("onUpload Function");
            //club.img = [...club.img, info.secure_url];
            image = {
                img: info.secure_url,
                clubid: club._id,
            }
            // image.img = [...image.img, info.secure_url];
            // image.clubid = club._id;
            console.log(image);
            const testing = await RugbyClubPOIService.addImage(image);
            // club.img = [...club.img, info.secure_url];
            // const testing = await RugbyClubPOIService.addClubImage(club, info.secure_url);  
            console.log(testing);			
		}else if(result.event === "error"){
			error = result.error;
			console.log(error);
		}
		widget.close();
	}

	// function onUpload(result, widget){
	// 	if(result.event === "success"){
	// 		info = result.info;
	// 		console.log(info);
	// 		const testing = await RugbyClubPOIService.addClubImage(UserId);	
	// 	}else if(result.event === "error"){
	// 		error = result.error;
	// 		console.log(error);
	// 	}
	// 	widget.close();
	// }

    const testing = async (club: Club, imageURL: string) => {
        alert('This is a test message');
        console.log("Testing Function")
        console.log(club);
        console.log(imageURL);
        const testing = await RugbyClubPOIService.addClubImage(club, imageURL);  
        console.log(testing);
    }
</script>

<!-- <CldUploadWidget uploadPreset="svelte-cloudinary-unsigned" let:open let:isLoading {onUpload} options={{
	sources: ['local'],
    cloudName: env.PUBLIC_CLOUDINARY_CLOUD_NAME,
    uploadPreset: env.PUBLIC_CLOUDINARY_UPLOAD_PRESET
}}>
	<a class="button imgBtn is-warning is-fullwidth is-medium is-uppercase has-text-grey mr-2" href="" on:click={open}>Add Image</a>
</CldUploadWidget> -->
<!-- 
{#if error}
	<p class="has-text-danger">{error.status}</p>
{/if}

{#if info}
	<img width={info.width} height={info.height} src={info.secure_url} alt="Uploaded Asset" />
	<p>{info.secure_url}</p>
{/if} -->




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

<a class="button imgBtn is-warning is-fullwidth is-medium is-uppercase has-text-grey mr-2" href="" on:click={testing(club, info.secure_url)}>TESTING UPDATE</a>
