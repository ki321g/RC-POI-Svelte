<script lang="ts">
	import { auth, user } from '$lib/firebase/firebase';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import SignupForm from "./SignupForm.svelte";
  import { redirect } from '@sveltejs/kit';
  import { goto } from '$app/navigation';

  let firstName = '';
	let lastName = '';
  let email = '';
	let password = '';
	let accountType = 'user';
  let newUser: any;
  let signedUp = false;

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

    // if (res.ok) {
    // // If the response was successful, redirect to '/dashboard'
    // // goto('/dashboard');
    //   location.reload();
    // }
	}

	async function signOutSSR() {
		const res = await fetch('/api/signup', { method: 'DELETE' });
		await signOut(auth);
	}
</script>

    <h1 class="title page-heading is-2 is-uppercase mb-3">Sign Up</h1>

    {#if $user}
    <h2 class="card-title">Welcome, {$user.displayName}</h2>
    <p class="text-center text-success">You are logged in</p>
    <p class="text-center">Your email is: {$user.email}</p>
    <p class="text-center">Your user ID is: {$user.uid}</p>
    <p class="text-center">Your photo URL is: {$user.photoURL}</p>
    <p class="text-center">Your provider ID is: {$user.providerId}</p>
    <p class="text-center">Your first name is: {firstName}</p>
    <p class="text-center">Your last name is: {lastName}</p>
    <p class="text-center">Your password is: {password}</p>
    <button class="btn btn-warning google-btn" on:click={signOutSSR}>Sign out</button>
    {:else}
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