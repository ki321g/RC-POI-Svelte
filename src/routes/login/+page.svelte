<script lang="ts">
	import { auth, user } from '$lib/firebase/firebase';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import LoginForm from "./LoginForm.svelte";
	import Message from '$lib/ui/Message.svelte';
  	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';;
    import { onMount } from 'svelte';

	let firstName = '';
	let lastName = '';
	let showError = false;
	let message = '';

	function generatePassword(length) {
		const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let password = "";
		for (let i = 0; i < length; i++) {
		password += charset.charAt(Math.floor(Math.random() * charset.length));
		}
		return password;
	}

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const credential = await signInWithPopup(auth, provider);
		console.log(credential)		

		const idToken = await credential.user.getIdToken();

		const email = $user.email;

		const res = await fetch('/api/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				// 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
			},
			body: JSON.stringify({ idToken, email })
		});
		const data = await res.json();
		console.log("RETURNED FROM SIGNIN");
		if (data.status === 400) {
			message = "User with that email does not exist. Visit the Signup page to Register"
			showError = true;
			await signOut(auth);
		} else { 
		if (res.status === 200) {
			if (data.user.accountType === 'superadmin') {
				await goto('/admin');
				window.location.reload();
			} else {
					await goto('/dashboard');
					window.location.reload();
			}
			}
		}
	}
	
	async function signOutSSR() {
		const res = await fetch('/api/signin', { method: 'DELETE' });
		await signOut(auth);
	}

</script>

    <h1 class="title page-heading is-2 is-uppercase mb-3 has-text-centered">Log in</h1>
	{#if showError}
		<Message message={message}></Message>
	{/if}
    <LoginForm />


	<div class="columns">
		<div class="column is-2">
			<!-- First column content goes here -->
		</div>
		<div class="column is-8 has-text-centered">		
			<button class="btn btn-primary google-btn" on:click={signInWithGoogle}>
				<img src="/images/google-logo.png" alt="Google logo" />
				Login in with Google
			</button>
		</div>
		<div class="column is-2">
			<!-- empty column -->
		</div>
	</div>

<style>
	.google-btn {
		background-color: #4285f4;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 2px;
		box-shadow: 0 3px 4px 0 rgba(0,0,0,0.25);
		font-size: 16px;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.google-btn img {
		margin-right: 10px;
		width: 40px;
		height: 40px;
	}
	.google-btn {
		cursor: pointer;
		width: 100%;
		height: 60px;
		font-size: 30px; 
	}
</style>