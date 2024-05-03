<script lang="ts">
  export const ssr = false;
    // @ts-ignore
    import Chart from 'svelte-frappe-charts';
    import type { Club, DataSet } from '$lib/types/rugby-club-poi-types';
    import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
    import { currentSession, clubStore } from "$lib/stores";
    import { getCategoryData } from "$lib/utilities/club-utils";
    import { onMount } from "svelte";
    import { get } from'svelte/store';

    let clubs = [];
    let chartType = 'bar';
    let chartTypes = ['bar', 'line', 'percentage'];

    //export let clubs: Club[];
    export let data: any;

    clubStore.subscribe(value => {
      clubs = value;
    });

    let categoryData: DataSet = {
      labels: [],
      datasets: [
        {
          values: []
        }
      ]
    };

    onMount(async () => {
      const fetchedClubs = data.clubs;
      console.log("onMount Charts:")
      console.log(data.clubs)
      console.log(fetchedClubs);
      categoryData = getCategoryData(fetchedClubs);
    });

  </script>
  
  <section class="section page-margin">
    <h1 class="title page-heading is-2 is-uppercase mb-3">Clubs Types</h1>
    <!-- <div class="">
      <input type="radio" bind:group={chartType} value="bar"> Bar Chart
      <input type="radio" bind:group={chartType} value="percentage"> Percentage Chart
  </div>
  {#if chartType === 'bar'}
    <Chart type="bar" data={categoryData} />
  {/if}
  
  {#if chartType === 'line'}
  <Chart type="line" data={categoryData} />
{/if}
    {#if chartType === 'percentage'}
      <Chart type="percentage" data={categoryData} />
    {/if}  -->

    <div class="columns">
      <div class="column is-narrow center-content">
        Bar Chart 
        <div class="buttons are-large">
          <input class="button is-normal test {chartType === 'bar' ? 'is-selected' : ''}" type="radio" bind:group={chartType} value="bar">
        </div>
        Percentage Chart
        <div class="buttons">
          <input class="button is-centered is-normal test {chartType === 'percentage' ? 'is-selected' : ''}" type="radio" bind:group={chartType} value="percentage"> 
        </div>
      </div>
    
      <div class="column">
        {#if chartType === 'bar'}
          <Chart type="bar" data={categoryData} />
        {:else if chartType === 'percentage'}
          <Chart type="percentage" data={categoryData} />
        {/if}
      </div>    
    </div>
</section>


<style>
  .center-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .test {
    /* border: 1px solid #000; */
    line-height: 20px;
    text-align: center;
    display: inline-block;
  }
  .test:checked {
    background-color: #6e6e6e;
  }
</style>