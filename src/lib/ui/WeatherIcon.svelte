<script lang="ts">
  import { getWeatherIcon } from "$lib/utilities/getWeatherIcon";

  export let iconCode: number;
</script>

<i class={getWeatherIcon(iconCode)} />
