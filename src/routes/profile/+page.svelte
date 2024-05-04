<script lang="ts">
	import ProfileForm from './ProfileForm.svelte';

	export let data: any;
</script>

<section class="section page-margin">
	<h1 class="title page-heading is-2 is-uppercase mb-3">Profile</h1>	
	<ProfileForm user={data.user} />
</section>
