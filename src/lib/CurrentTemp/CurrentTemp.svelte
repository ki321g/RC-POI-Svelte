<script lang="ts">
    import { onMount } from 'svelte';
    // import axios from "axios";
    // import { location, unit } from "$src/stores";
    import type { CurrentTemp } from "./curr_temp";
    // import { convertTemp } from "$lib/utilities/convertTemp";
    import { toSentenceCase } from "$lib/utilities/toSentenceCase";
    import WeatherIcon from "$lib/ui/WeatherIcon.svelte";
  
    export let currentWeather: any;
  
    let currentTemp: CurrentTemp = {
      temp: null,
      feels_like: null,
      humidity: null,
      description: null,
      iconCode: null,
    };
  
    // Fetch weather data and store in currentTemp
    // $: {
    //   if ($location.name) {
    //     axios("https://api.openweathermap.org/data/2.5/weather", {
    //       params: {
    //         lat: $location.lat,
    //         lon: $location.lon,
    //         appid: import.meta.env.VITE_WEATHER_API_KEY,
    //       },
    //     }).then(({ data }) => {
    //       currentTemp.temp = data.main.temp;
    //       currentTemp.feels_like = data.main.feels_like;
    //       currentTemp.humidity = data.main.humidity;
    //       currentTemp.description = data.weather[0].description;
    //       currentTemp.iconCode = data.weather[0].id;
    //     });
    //   }
    // }
    
    onMount(() => {      
      // console.log("kieron is here")
      // console.log(currentForecast);
      currentTemp = currentWeather;
    });

    // Convert temperature values and round down
    // $: temp = Math.round(convertTemp(currentTemp.temp, $unit));
    // $: feels_like = Math.round(convertTemp(currentTemp.feels_like, $unit));
  </script>
  
  <div class="wrapper">
    {#if currentTemp.temp}
      <h2 class="current-temp">{currentTemp.temp}&deg;C</h2>
      <p class="feels-like">Feels like {currentTemp.feels_like}&deg;C</p>
  
      <div class="details">
        {toSentenceCase(currentTemp.description)} <br />
        Humidity: {currentTemp.humidity}%
      </div>
  
      <div class="weather-icon">
        <WeatherIcon iconCode={currentTemp.iconCode} />
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
  