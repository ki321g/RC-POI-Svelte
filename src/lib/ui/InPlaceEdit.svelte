<script>
    //  URL when talking about inline editing
    //  https://svelte.dev/repl/29c1026dda3c47a187bd21afa0782df1?version=4.2.15
    // @ts-nocheck
    import { createEventDispatcher, onMount } from 'svelte'
  
    export let value, required = true
    export let categoryField = false; // Prop to determine if it's the category field
    export let clubCategories = []; // Prop to accept an array of allowed categories
  
    const dispatch = createEventDispatcher()
    let editing = false, original
  
    onMount(() => {
      original = value
    })
  
    function edit() {
      editing = true
    }
  
    function submit() {
          if (value != original) {
              dispatch('submit', value)
          }
          
      editing = false
    }
  
    function keydown(event) {
      if (event.key == 'Escape') {
        event.preventDefault()
        value = original
        editing = false
      }
    }
      
      function focus(element) {
          element.focus()
      }
  </script>
  
  {#if editing}
    <form on:submit|preventDefault={submit} on:keydown={keydown}>
        {#if categoryField}
            <select bind:value={value} on:blur={submit} use:focus class="input">
                {#each clubCategories as category}
                <option value={category}>{category}</option>
                {/each}
            </select>
        {:else}
            <input bind:value on:blur={submit} {required} use:focus/>
        {/if}
    </form>
  {:else}
    <div on:click={edit}>
      {value}
    </div>
  {/if}
  
  <style>
    input {
      border: none;
      background: none;
      font-size: inherit;
      color: inherit;
      font-weight: inherit;
      text-align: inherit;
      box-shadow: none;
    }
  </style>
  