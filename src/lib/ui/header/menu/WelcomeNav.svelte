<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="buttons">
    <a class:is-primary={$page.url.pathname.includes('/clubs')} class="button button-font is-uppercase" href="/clubs">Clubs <i class="fa-solid fa-location-dot pl-2 fa-xl"></i> </a>
    <a class:is-primary={$page.url.pathname.includes('/map')} class="button button-font is-uppercase" href="/map">Maps <i class="fa-solid fa-map-location pl-2 fa-xl"></i> </a>
	<a class:is-primary={$page.url.pathname.includes('/about')} class="button button-font is-uppercase" href="/about"> About <i class="fa-solid fa-address-card pl-2 fa-xl"></i></a>
    <a class:is-primary={$page.url.pathname.includes('/login')} class="button button-font is-uppercase" href="/login"> Log in <i class="fa-solid fa-right-to-bracket pl-2 fa-xl"></i></a>
    <a data-sveltekit-preload-data="tap" class:is-primary={$page.url.pathname.includes('/signup')} class="button button-font is-uppercase" href="/signup"> Sign up <i class="fa-solid fa-user-plus pl-2 fa-xl"></i></a>
</div>
