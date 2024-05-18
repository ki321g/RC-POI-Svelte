<script lang="ts">
	import { page } from '$app/stores';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
</script>

<section class="section pt-6">
	<div class="blog-posts">
		<div class="box box-link-hover-shadow">
			<div class="columns featured-post is-multiline">
				<div class="column is-12 post">
					<slot />
				</div>
			</div>
		</div>
	</div>
</section>
