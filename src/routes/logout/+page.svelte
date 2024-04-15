<script lang="ts">
  import { goto } from "$app/navigation";
  import { user } from '$lib/stores';

  user.set({ email: "", token: "", _id: "" });
  goto("/");
</script>