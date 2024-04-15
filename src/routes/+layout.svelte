<script lang="ts">
	// import { user } from '$lib/stores/user';]
    import { user } from "$lib/stores";
    import WelcomeNav from '$lib/ui/header/menu/WelcomeNav.svelte';
    import MemberNav from '$lib/ui/header/menu/MemberNav.svelte';
    // import AdminNav from '$lib/ui/header/menu//AdminNav.svelte';
    import Header from "$lib/ui/header/Header.svelte";

</script>

<Header>
	{#if $user?._id}
		<MemberNav />
	{:else}
		<WelcomeNav />
	{/if}
</Header>

<div class="section">
	<div class="container">
		<slot />
	</div>
</div>