<script>
	import { CldUploadWidget } from 'svelte-cloudinary';
	import { env } from '$env/dynamic/public';
	// import { env } from '$env/static/public';
	// import { PUBLIC_CLOUDINARY_UPLOAD_PRESET, VITE_PUBLIC_CLOUDINARY_CLOUD_NAME } from '$env/static/public'

	let info;
	let error;

	function onUpload(result, widget){
		if(result.event === "success"){
			info = result.info;
			console.log(info);
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
    uploadPreset: env.PUBLIC_CLOUDINARY_UPLOAD_PRESET
}}>
	<a class="button imgBtn is-warning is-fullwidth is-medium is-uppercase has-text-grey mr-2" href="" on:click={open}>Add Image</a>
</CldUploadWidget>

{#if error}
	<p class="has-text-danger">{error.status}</p>
{/if}

{#if info}
	<img width={info.width} height={info.height} src={info.secure_url} alt="Uploaded Asset" />
	<p>{info.secure_url}</p>
{/if}