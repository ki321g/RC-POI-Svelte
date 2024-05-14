<script lang="ts">
    export let title = "";
  </script>
  
  <div class="card mb-5">
    <header class="card-header">
      <p class="card-header-title">{title}
      <span class="card-header-extra">
      <slot name="first-select-header" />
      </span>
    </p>
    </header>
    <div class="card-content">
      <div class="content">
        <slot />
      </div>
    </div>
  </div>

<style>    
	.card-header-extra {
		margin-left: auto;
	}
</style>