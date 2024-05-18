<script lang="ts">
    export let mode: "hourly" | "daily";
</script>
  
  <div class="wrapper">
    <label>
      <input
        type="radio"
        name="mode"
        value="hourly"
        class="radio"
        bind:group={mode}
      />
      <span class="button">Hourly</span>
    </label>
    <label>
      <input
        type="radio"
        name="mode"
        value="daily"
        class="radio"
        bind:group={mode}
      />
      <span class="button">Daily</span>
    </label>
  </div>
  
  <style lang="scss">
    
    // @import '$lib/scss/variables.scss';

    .wrapper {
      display: flex;
      border: 1px solid hsl(0 0% 87%);
      border-radius: 0.2em;
    }
  
    .button {
      display: inline-block;
      padding: 0.2em 0.8em;
      font-size: 16px;
      cursor: pointer;
      transition: 200ms ease;
    }
  
    .radio {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
  
      &:checked ~ .button {
        background-color: hsl(0 0% 87%);
        color: hsl(0 0% 13%);
      }
    }
  </style>
  