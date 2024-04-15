<script lang="ts">
	import Brand from '$lib/ui/Brand.svelte';	
</script>

<nav class="navbar is-fixed-top has-shadow is-info px-6" style="z-index: 999999;">
	<div class="navbar-brand">
		<Brand />
	</div>
	<!-- <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
		<span aria-hidden="true"></span>
		<span aria-hidden="true"></span> <span aria-hidden="true"></span>
	</a> -->
	<div class="navbar-menu" id="navMenu">
		<div class="navbar-end">
			<div class="navbar-item">
				<slot />
			</div>
		</div>
	</div>
</nav>
