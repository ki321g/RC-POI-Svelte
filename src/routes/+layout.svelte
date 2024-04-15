<script lang="ts">
	// import { user } from '$lib/stores/user';]
    import { currentSession } from "$lib/stores";
    import WelcomeNav from '$lib/ui/WelcomeNav.svelte';
    import MemberNav from '$lib/ui/MemberNav.svelte';
    // import AdminNav from '$lib/ui/AdminNav.svelte';
    import Header from "$lib/ui/Header.svelte";
    // import WelcomeNav from '$lib/components/WelcomeNav.svelte';

</script>

<Header>
	{#if $currentSession}
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