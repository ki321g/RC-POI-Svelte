<script lang="ts">
    import { goto } from "$app/navigation";
    import { currentLoggedInUser } from "$lib/stores";
  
    currentLoggedInUser.set({ firstName: '', lastName: '', email: '', accountType: '', _id: '', token: '' });
    goto("/");
  </script>
  