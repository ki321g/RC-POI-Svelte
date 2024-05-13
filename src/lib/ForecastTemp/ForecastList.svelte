<script lang="ts">
    import { location } from "$lib/location";
    import axios from "axios";
    import { onMount } from 'svelte';
    import ForecastItem from "./ForecastItem.svelte";
    export let mode: "hourly" | "daily";
  
    const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
    
    export let currentForecast: any;
    

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
    
    onMount(() => {      
      // console.log("kieron is here")
      // console.log(currentForecast);
      tempList = currentForecast;
    });
    // location.subscribe((location) => {
    //   if (location.name) {
    //     axios(FORECAST_API_URL, {
    //       params: {
    //         lat: location.lat,
    //         lon: location.lon,
    //         appid: import.meta.env.VITE_WEATHER_API_KEY,
    //       },
    //     }).then(({ data }) => {
    //       tempList = data.list;
    //     });
    //   }
    // });
  </script>
  
  <div class="forecast-list has-background-white" class:skeleton={!tempList.length}>
    {#if tempList.length}
      {#each tempList as temp, index}
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
    
    @import '$lib/scss/variables.scss';
    
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
  