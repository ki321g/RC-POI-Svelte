<script lang="ts">
    import ForecastMode from "./ForecastMode.svelte";
    import ForecastList from "./ForecastList.svelte";
  
    let mode: "hourly" | "daily" = "hourly";
    export let currentForecast: any;
  </script>
  
  <section class="wrapper">
    <header class="header">
      <h2 class="heading has-text-weight-bold">Forecast</h2>
      <ForecastMode bind:mode />
    </header>
    <ForecastList {mode} {currentForecast}/>
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
  