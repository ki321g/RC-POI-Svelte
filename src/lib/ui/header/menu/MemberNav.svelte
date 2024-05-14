<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="buttons">
	<a id="dashboard" class:is-primary={$page.url.pathname.includes('/dashboard')} class="button button-font is-uppercase" href="/dashboard"> Dashboard <i class="fa-solid fa-gauge pl-2 fa-xl"></i></a>
	<a id="clubs" class:is-primary={$page.url.pathname.includes('/clubs')} class="button button-font is-uppercase" href="/clubs"> Clubs <i class="fa-solid fa-location-dot pl-2 fa-xl"></i></a>
    <a class:is-primary={$page.url.pathname.includes('/map')} class="button button-font is-uppercase" href="/map">Maps <i class="fa-solid fa-map-location pl-2 fa-xl"></i> </a>	    
	<a id="profile" class:is-primary={$page.url.pathname.includes('/profile')} class="button button-font is-uppercase" href="/profile"> Profile <i class="fa-solid fa-user pl-2 fa-xl"></i></a>
	<a data-sveltekit-preload-data="tap" id="logout" class="button button-font is-uppercase is-danger" href="/logout"> Logout <i class="fa-solid fa-sign-out pl-2 fa-xl"></i></a>
</div>
