<script lang="ts">
import type { User } from '$lib/types/rugby-club-poi-types';
import InPlaceEdit from '$lib/ui/InPlaceEdit.svelte';

export let data: any;
let userForm: any;
let newUser: any;

	function submit(field) {
		return ({ detail: newValue }) => {
			// IRL: POST value to server here
			console.log(`updated ${field}, new value is: "${newValue}"`);
		};
	}

	async function updateUser(user: User) {
		// alert('Are you sure you want to update this user?');
		console.log(user);

		newUser = {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				password: user.password,
				accountType: user.accountType
			};
		// console.log(newUser);
		const res = await fetch('/api/updateuser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				// 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
			},
			body: JSON.stringify({ newUser })
		});
		const updatedData = await res.json();
		// alert(updatedData.status);
		if (updatedData.status === 200) {
			alert('User updated');
		} else {
			alert('Error updating user');
		}
		console.log(updatedData);
		window.location.reload()
		
	} 
	
	async function deleteUser(gameId: String) {
		alert('Are you sure you want to delete this game?');
	console.console.log(gameId);	
	} 
</script>



<section class="section pt-6">
	<div class="blog-posts">
		<div class="box box-link-hover-shadow">
			<div class="columns featured-post is-multiline">
				<div class="column is-12 post">
					<h1 class="title page-heading is-2 is-uppercase mb-3">USER ADMIN</h1>
		<!-- {users[0].email} -->
					<!-- {#each data.users as user}
						<div >Hello {user.email}</div>
					{/each} -->
					<table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
						<thead>
						  <tr class="is-uppercase">
							<th>FirstName</th>
							<th>LastName</th>
							<th>eMail</th>
							<th>password</th>
							<th>accountType</th>
							<th>Action</th>
						  </tr>
						</thead>
						<tbody>
							{#each data.users as user (user._id)}
							<tr>
							  <td>		
								<!-- {user.firstName} -->
								<InPlaceEdit bind:value={user.firstName} on:submit={submit('firstName')}/>
							  </td>
							  <td>
								<!-- {user.lastName} -->
								<InPlaceEdit bind:value={user.lastName} on:submit={submit('lastName')}/>
							  </td>
							  <td>
								<!-- {user.email}								 -->
								<InPlaceEdit bind:value={user.email} on:submit={submit('email')}/>
							  </td>
							  <td>
								<InPlaceEdit bind:value={user.password} on:submit={submit('password')}/>
							  </td>
							  <td>
								<!-- {user.accountType} on:click={updateUSer(user)}-->
								<InPlaceEdit bind:value={user.accountType} on:submit={submit('accountType')}/>
							  </td>
							  <td>
								<a href="#" class="ui icon button" on:click={() => updateUser(user)}>
									<i class="fas fa-edit"></i>
								</a>
								<a href="#" class="ui icon button" on:click={() => deleteUser(user._id)}>
									<i class="fas fa-trash"></i>
								</a>
								<!-- <a class="ui icon button" href="#" on:click={() => updateUser(user)}>
									<i class="fas fa-edit fa-xl mr-2"></i> -->
								<!-- </a> -->
								<!-- <a href="/edituser/{user._id}" class="ui icon button">
								  <i class="fas fa-edit"></i>
								</a> -->
								<!-- <a href="/deleteuser/{user._id}" class="ui icon button">
								  <i class="fas fa-trash"></i> -->
								<!-- </a>           -->
							  </td>
							</tr>
						  {/each}
						</tbody>
					  </table>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- <form bind:this={userForm} on:submit|preventDefault={updateUser}>
    <input bind:value={user._id} class="input mb-3" type="hidden" id="userid" placeholder="user id" name="userid" />
    <input bind:value={user.firstName} class="input mb-3" type="hidden" id="user-fname" placeholder="fristname" name="fristname" />
    <input bind:value={user.lastName} class="input mb-3" type="hidden" id="user-lname" placeholder="lastname" name="lastname" />
    <input bind:value={user.email} class="input mb-3" type="hidden" id="user-email" placeholder="email" name="email" />
    <input bind:value={user.password} class="input mb-3" type="hidden" id="user-password" placeholder="password" name="password" />
    <input bind:value={user.accountType} class="input mb-3" type="hidden" id="user-accountType" placeholder="accountType" name="accountType" />
</form> -->