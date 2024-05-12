<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Club from "./Club.svelte";

  export let data: any;
  let showButton = false;

  function scrollToTop() {
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        });
    }

    onMount(() => {
        const checkScroll = () => {
            showButton = window.scrollY > 200;
        };

        window.addEventListener('scroll', checkScroll);
        checkScroll();

        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
  });
</script>

{#if showButton}
  <div id="back-to-top" class="button button-font is-uppercase" on:click={scrollToTop}>Back to Top</div>
{/if}

<Club clubs={data.clubs} clubCounties={data.clubCounties} />

<style>
  #back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: hsl(171, 100%, 41%);
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    color: white;
  }
</style>