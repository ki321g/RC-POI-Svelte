<script lang="ts">
  import Club from "./Club.svelte";

  export let data: any;

</script>
<Club clubs={data.clubs} clubCounties={data.clubCounties} />

