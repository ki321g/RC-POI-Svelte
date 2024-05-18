<script lang="ts">
	import { auth, user } from '$lib/firebase/firebase';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import SignupForm from './SignupForm.svelte';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	let firstName = '';
	let lastName = '';
	let email = '';
	let password = '';
	let newPassword = '';
	let accountType = 'user';
	let newUser: any;
	let signedUp = false;

	function generatePassword(length) {
		const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let setPassword = '';
		for (let i = 0; i < length; i++) {
			setPassword += charset.charAt(Math.floor(Math.random() * charset.length));
		}
		return setPassword;
	}

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const credential = await signInWithPopup(auth, provider);
		console.log(credential);

		if ($user && $user.displayName) {
			const names = $user.displayName.split(' ');
			firstName = names[0];
			lastName = names.length > 1 ? names[names.length - 1] : '';
			email = $user.email;

			password = generatePassword(8); // generate random password

			newUser = {
				firstName,
				lastName,
				email,
				password,
				accountType
			};
		}

		const idToken = await credential.user.getIdToken();

		const res = await fetch('/api/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				// 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
			},
			body: JSON.stringify({ idToken, newUser })
		});

    	if (res.status === 200) {
			const data = await res.json();
			console.log(data);
			console.log("USER CREATED");
			console.log(data.user);
		}
	}
	async function updatePassword() {
		newUser.password = newPassword;

		const res = await fetch('/api/updateuser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				// 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
			},
			body: JSON.stringify({ newUser })
		});
		const updatedData = await res.json();
		console.log(updatedData);
		await goto('/dashboard');
		window.location.reload();
	}

	async function signOutSSR() {
		const res = await fetch('/api/signup', { method: 'DELETE' });
		await signOut(auth);
	}
</script>

    

    {#if $user}
	<h1 class="title page-heading is-2 is-uppercase mb-3 has-text-centered">Change Your Password</h1>
	
	<div class="columns">
		<div class="column is-2">
			<!-- First column content goes here -->
		</div>
		<div class="column is-8 pt-5">
			<h2 class="is-size-3">Welcome, {firstName}</h2>
			<h3 class="is-size-4">We set a temporay password of <strong>{password}</strong> please update it below</h3>
			<div class="columns pt-3">
				<div class="column">
					<div class="field ">
						<div class="control">
							<input class="input is-large" type="password" placeholder="Enter New Password" bind:value={newPassword} />
						</div>
					</div>
				</div>
				<div class="column">
					<div class="field">
						<div class="control">
							<button class="button is-warning is-large google-btn" on:click={updatePassword}>Update Password</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="column is-2">
			<!-- empty column -->
		</div>
	</div>	
    {:else}
	<h1 class="title page-heading is-2 is-uppercase mb-3 has-text-centered">Sign Up</h1>
    <SignupForm />
	<div class="columns">    
		<div class="column is-2">
			<!-- First column content goes here -->
		</div>
		<div class="column is-8 has-text-centered">
		
			<button class="btn btn-primary google-btn" on:click={signInWithGoogle}>
				<img src="/images/google-logo.png" alt="Google logo" />
				Signup with Google
			</button>
		
		</div>
		<div class="column is-2">
			<!-- empty column -->
		</div>
	</div>
  {/if}	
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