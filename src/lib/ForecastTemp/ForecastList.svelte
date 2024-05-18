<script lang="ts">
    import { location } from "$lib/location";
    import axios from "axios";
    import { onMount } from 'svelte';
    import ForecastItem from "./ForecastItem.svelte";
    import { currentForecast, currentWeather } from '$lib/stores';	
    import { onDestroy } from 'svelte';

    export let mode: "hourly" | "daily";
  
    const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";    

    let tempList: Array<{
      dt_txt: string;
      main: {
        temp: number;
      };
      weather: Array<{
        description: string;
        id: number;
      }>;
    }> = [];

    let forecast;
    const unsubscribe = currentForecast.subscribe(value => {
      forecast = value;
    });

    onDestroy(unsubscribe);
    
    onMount(() => {      

    });

  </script>
  
  <div class="forecast-list has-background-white" class:skeleton={!forecast.length}>
    {#if forecast.length}
      {#each forecast as temp, index}
        {#if (mode === "hourly" && index < 10) || (mode === "daily" && index % 8 === 0)}
          <ForecastItem {temp} {mode} />
        {/if}
      {/each}
    {:else}
      {#each Array(10) as _}
        <div class="skeleton-item" role="presentation">
          <div class="skeleton-icon" />
          <div class="skeleton-label" />
        </div>
      {/each}
    {/if}
  </div>
  
  <style lang="scss">
    
    // @import '$lib/scss/variables.scss';
    
    .forecast-list {
      display: flex;
      overflow: auto;
      padding-block: 1em;
      border-block: 1px solid #fff;
      scroll-snap-type: x mandatory;
    }
  
    .skeleton {
      justify-content: space-evenly;
      gap: 2em;
      opacity: 0.6;
  
      &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2em;
        padding-block: 1em;
      }
  
      &-icon {
        width: 100px;
        aspect-ratio: 1;
      }
  
      &-label {
        width: 120px;
        height: 30px;
      }
  
      &-icon,
      &-label {
        background: hsl(0 0% 43% / 0.29);
      }
    }
  
    @keyframes shine {
      to {
        background-position-x: -200%;
      }
    }
  </style>
  