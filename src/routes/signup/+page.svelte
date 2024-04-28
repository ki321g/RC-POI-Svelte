<script lang="ts">
  import SignupForm from "./SignupForm.svelte";
</script>

<section class="section page-margin"> 
  <!-- {{#if CreateSuperAdmin}}
    <div class="notification is-danger">
      <button class="delete"></button> No SuperAdmin Account: Please Create one now.
    </div>
  {{/if}} -->
  <h1 class="title page-heading is-2 is-uppercase mb-3">Sign up </h1> 
  <SignupForm></SignupForm>
</section>
