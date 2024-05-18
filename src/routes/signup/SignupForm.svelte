<script lang="ts">
    import { goto } from "$app/navigation";
  
    let firstName = "";
    let lastName = "";
    let email = "";
    let password = "";
    let errorMessage = "";
  
    // async function signup() {
    //   const success = false;
    //   if (success) {
    //     goto("/dashboard");
    //   } else {
    //     errorMessage = "Error Trying to sign up";
    //   }
    // }
  </script>

{#if errorMessage}
	<div class="message is-danger">
		<div class="message-body">
			<strong> {errorMessage} </strong>
		</div>
	</div>
{/if}

<form method="POST" action="?/signup">
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
            <input bind:value={firstName} class="input" type="text" placeholder="Enter first name" id="newFirstName" name="firstName">
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <label  class="label" for="newLastName">Last Name</label>
          <p class="control has-icons-left">
            <input bind:value={lastName} class="input" type="text" placeholder="Enter last name" id="newLastName" name="lastName">
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
      <input bind:value={email} class="input" type="email" placeholder="Enter email" id="newEmail" name="email">
      <span class="icon is-small is-left">
        <i class="fas fa-envelope"></i>
      </span>
    </p>
  </div>
  <div class="field">
    <label class="label" for="newPassword">Password</label>
    <p class="control has-icons-left">
      <input bind:value={password} class="input" type="password" placeholder="Enter password"  id="newPassword" name="password">
      <span class="icon is-small is-left">
        <i class="fas fa-lock"></i>
      </span>
    </p>
  </div>
  
  <input type="hidden" name="accountType" value="user">
  <div class="field">
    <p class="control">
      <button class="button is-primary is-large is-fullwidth">
        Sign Up
      </button>
    </p>
  </div>
  </div>
    <div class="column is-2">
      <!-- empty column -->
    </div>
  </div>
    </form>