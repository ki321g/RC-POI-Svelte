<script lang="ts">
	import { auth, user } from '$lib/firebase/firebase';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import LoginForm from "./LoginForm.svelte";

	let firstName = '';
	let lastName = '';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const credential = await signInWithPopup(auth, provider);
		console.log(credential)

		if ($user && $user.displayName) {
		const names = $user.displayName.split(' ');
		firstName = names[0];
		lastName = names.length > 1 ? names[names.length - 1] : '';
		}

		const idToken = await credential.user.getIdToken();

		const res = await fetch('/api/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				// 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
			},
			body: JSON.stringify({ idToken })
		});
	}

	async function signOutSSR() {
		const res = await fetch('/api/signin', { method: 'DELETE' });
		await signOut(auth);
	}
</script>

    <h1 class="title page-heading is-2 is-uppercase mb-3">Log in</h1>
    <LoginForm />


	<div class="columns">
		<div class="column is-2">
			<!-- First column content goes here -->
		</div>
		<div class="column is-8 has-text-centered">
		{#if $user}
			<h2 class="card-title">Welcome, {$user.displayName}</h2>
			<p class="text-center text-success">You are logged in</p>
			<p class="text-center">Your email is: {$user.email}</p>
			<p class="text-center">Your user ID is: {$user.uid}</p>
			<p class="text-center">Your photo URL is: {$user.photoURL}</p>
			<p class="text-center">Your provider ID is: {$user.providerId}</p>
			<p class="text-center">Your first name is: {firstName}</p>
			<p class="text-center">Your last name is: {lastName}</p>
			<button class="btn btn-warning google-btn" on:click={signOutSSR}>Sign out</button>
		{:else}
			<button class="btn btn-primary google-btn" on:click={signInWithGoogle}>
				<img src="/images/google-logo.png" alt="Google logo" />
				Login in with Google
			</button>
		{/if}	
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