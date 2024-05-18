<script lang="ts">
	import type { User } from '$lib/types/rugby-club-poi-types';
    import { goto } from "$app/navigation";
	import { enhance } from '$app/forms';

	export let user: User[];
  let errorMessage = "";

</script>

{#if errorMessage}
	<div class="message is-danger">
		<div class="message-body">
			<strong> {errorMessage} </strong>
		</div>
	</div>
{/if}

<form method="POST" action="?/update" use:enhance>
    <div class="columns">
    <div class="column is-2">
      <!-- empty column -->
    </div>
    <div class="column is-8">
      <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label class="label" for="newFirstName">First Name</label>
          <p class="control has-icons-left">
            <input bind:value={user.firstName} class="input" type="text" placeholder="Enter first name" id="newFirstName" name="firstName">
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <label  class="label" for="newLastName">Last Name</label>
          <p class="control has-icons-left">
            <input bind:value={user.lastName} class="input" type="text" placeholder="Enter last name" id="newLastName" name="lastName">
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
   <div class="field">
    <label class="label" for="newEmail">Email</label>
    <p class="control has-icons-left">
      <input bind:value={user.email} class="input" type="email" placeholder="Enter email" id="newEmail" name="email">
      <span class="icon is-small is-left">
        <i class="fas fa-envelope"></i>
      </span>
    </p>
  </div>
  <div class="field">
    <label class="label" for="newPassword">Password</label>
    <p class="control has-icons-left">
      <input class="input" type="password" placeholder="Enter password"  id="newPassword" name="password">
      <span class="icon is-small is-left">
        <i class="fas fa-lock"></i>
      </span>
    </p>
  </div>
  
  <input type="hidden" name="accountType" value="user">
  <div class="field">
    <p class="control">
      <button class="button is-primary is-large is-fullwidth">
        Update
      </button>
    </p>
  </div>
  </div>
    <div class="column is-2">
      <!-- empty column -->
    </div>
  </div>
</form>
