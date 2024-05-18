<script lang="ts">
	import { onMount } from 'svelte';
	import { auth, user } from '$lib/firebase/firebase';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { currentSession } from '$lib/stores';

	async function signOutSSR() {
		const res = await fetch('/api/signin', { method: 'DELETE' });
		await signOut(auth);
	}

	onMount(async () => {    
		signOutSSR();
		currentSession.set({ firstName: '', lastName: '', email: '', accountType: '', _id: '', token: '' });
		goto('/');
	});
</script>
