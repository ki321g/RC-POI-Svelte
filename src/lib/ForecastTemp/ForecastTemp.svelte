<script lang="ts">
  import { onMount } from 'svelte';
    import ForecastMode from "./ForecastMode.svelte";
    import ForecastList from "./ForecastList.svelte";
  
    let mode: "hourly" | "daily" = "hourly";

    onMount(() => {
    mode = "hourly";
  });
</script>
  
  <section class="wrapper">
    <header class="header">
      <h2 class="title page-heading is-2 is-uppercase mb-0 pt-4">Forecast</h2>
      <ForecastMode bind:mode />
    </header>
    <ForecastList {mode} />
  </section>
  
  <style lang="scss">
    @import '$lib/scss/variables.scss';

    .header {
      display: flex;
      justify-content: space-between;
      align-items: end;
      line-height: unset;
      margin-bottom: 0.4em;
    }
  
    .heading {
      font-size: 24px;
    }
  </style>
  