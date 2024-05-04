<script lang="ts">
  import Club from "$lib/ui/Club.svelte";
  
  export let data: any;

</script>
<Club clubs={data.clubs} clubCounties={data.clubCounties} />

