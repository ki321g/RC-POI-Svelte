<script lang="ts">
    import { onMount } from 'svelte';
    import type { CurrentTemp } from "./curr_temp";
    import { toSentenceCase } from "$lib/utilities/toSentenceCase";
    import WeatherIcon from "$lib/ui/WeatherIcon.svelte"; 
    import { currentForecast, currentWeather } from '$lib/stores';	
    import { onDestroy } from 'svelte';

    let weather;
    // unsubscribe from the store
    const unsubscribe = currentWeather.subscribe(value => {
      weather = value;
    });
    
    onDestroy(unsubscribe); // unsubscribe from the store

  </script>
  
  <div class="wrapper">
    {#if weather.temp}
      <h2 class="current-temp">{weather.temp}&deg;C</h2>
      <p class="feels-like">Feels like {weather.feels_like}&deg;C</p>
  
      <div class="details">
        {toSentenceCase(weather.description)} <br />
        Humidity: {weather.humidity}%
      </div>
  
      <div class="weather-icon">
        <WeatherIcon iconCode={weather.iconCode} />
      </div>
    {:else}
      <div class="skeleton" role="presentation">
        <div class="heading" />
        <div class="subtitle" />
        <div class="paragraph" />
      </div>
    {/if}
  </div>
  
  <style lang="scss">
    .wrapper {
      position: relative;
    }
  
    .current-temp {
      font-size: 96px;
      font-weight: 400;
      line-height: 1.2;
  
      @media (min-width: 500px) {
        font-size: 144px;
      }
    }
  
    .feels-like {
      font-size: 24px;
      margin-bottom: 1em;
      @media (min-width: 500px) {
        font-size: 36px;
      }
    }
  
    .details {
      font-size: 18px;
      line-height: 1.2;
      @media (min-width: 500px) {
        font-size: 24px;
      }
    }
  
    .weather-icon {
      display: flex;
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 3rem;
      line-height: 1.2;
  
      @media (min-width: 500px) {
        font-size: 6rem;
        line-height: 1.7;
      }
  
      @media (min-width: 800px) {
        top: 2rem;
        bottom: unset;
      }
    }
  
    .skeleton {
      opacity: 0.6;
  
      * {
        background: hsl(0 0% 43% / 0.29);
      }
  
      .heading {
        height: 96px;
        width: 15em;
        margin-bottom: 1em;
      }
      .subtitle {
        height: 24px;
        width: 12em;
        margin-bottom: 2em;
      }
      .paragraph {
        height: 36px;
        width: 10em;
      }
  
      @media (min-width: 500px) {
        .heading {
          height: 144px;
          width: 20em;
          margin-bottom: 2em;
        }
        .subtitle {
          height: 36px;
          width: 18em;
          margin-bottom: 4em;
        }
      }
    }
  </style>
  