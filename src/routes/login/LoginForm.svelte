<script lang="ts">
	let email = '';
	let password = '';
	let errorMessage = '';
</script>

{#if errorMessage}
	<div class="message is-danger">
		<div class="message-body">
			<strong> {errorMessage} </strong>
		</div>
	</div>
{/if}

<form method="POST" action="?/login">
	<div class="columns">
		<div class="column is-2">
			<!-- First column content goes here -->
		</div>
		<div class="column is-8">
			<div class="field">
				<label class="label" for="email">Email</label>
				<p class="control has-icons-left">
					<input bind:value={email} class="input" type="email" placeholder="Enter email" name="email" />
					<span class="icon is-small is-left">
						<i class="fas fa-envelope"></i>
					</span>
				</p>
			</div>
			<div class="field">
				<label class="label" for="password">Password</label>
				<p class="control has-icons-left">
					<input bind:value={password} class="input" type="password" placeholder="Enter password" name="password" />
					<span class="icon is-small is-left">
						<i class="fas fa-lock"></i>
					</span>
				</p>
			</div>
			<div class="field">
				<p class="control">
					<button class="button is-primary is-large is-fullwidth"> Login </button>
				</p>
			</div>
		</div>
		<div class="column is-2">
			<!-- empty column -->
		</div>
	</div>
</form>
