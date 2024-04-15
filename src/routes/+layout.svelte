<script lang="ts">
	// import { user } from '$lib/stores/user';]
    import { user } from "$lib/stores";
    import WelcomeNav from '$lib/ui/menu/WelcomeNav.svelte';
    import MemberNav from '$lib/ui/menu/MemberNav.svelte';
    // import AdminNav from '$lib/ui/menu/AdminNav.svelte';
    import Header from "$lib/ui/Header.svelte";
    // import WelcomeNav from '$lib/components/WelcomeNav.svelte';

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