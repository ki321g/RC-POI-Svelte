<script lang="ts">
	import { currentSession } from '$lib/stores';
	import WelcomeNav from '$lib/ui/header/menu/WelcomeNav.svelte';
	import MemberNav from '$lib/ui/header/menu/MemberNav.svelte';
	import AdminNav from '$lib/ui/header/menu//AdminNav.svelte';
	import Header from '$lib/ui/header/Header.svelte';

	export let data: any;
	if (data.session) {
		currentSession.set(data.session);
	} else {
		currentSession.set({ firstName: '', lastName: '', email: '', accountType: '', _id: '', token: '' });
	}
</script>

<Header>
	{#if $currentSession._id}
		{#if $currentSession.accountType === 'superadmin'}
			<AdminNav />
		{:else}
			<MemberNav />
		{/if}
	{:else}
		<WelcomeNav />
	{/if}
</Header>

<div class="section">
	<div class="container">
		<slot />
	</div>
</div>
