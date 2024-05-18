<script lang="ts">
	import type { User } from '$lib/types/rugby-club-poi-types';
	import InPlaceEdit from '$lib/ui/InPlaceEdit.svelte';

	export let data: any;
	let userForm: any;
	let newUser: any;
	const userAccountTypes = ['superadmin', 'user'];

	function submit(field) {
		return ({ detail: newValue }) => {
			console.log(`updated ${field}, new value is: "${newValue}"`);
		};
	}

	async function updateUser(user: User) {
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
		if (updatedData.status === 200) {
			alert('User updated');
		} else {
			alert('Error updating user');
		}
		console.log(updatedData);
		window.location.reload();
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
								<InPlaceEdit bind:value={user.firstName} on:submit={submit('firstName')}/>
							  </td>
							  <td>
								<InPlaceEdit bind:value={user.lastName} on:submit={submit('lastName')}/>
							  </td>
							  <td>
								<InPlaceEdit bind:value={user.email} on:submit={submit('email')}/>
							  </td>
							  <td>
								<InPlaceEdit bind:value={user.password} on:submit={submit('password')}/>
							  </td>
							  <td>
								<InPlaceEdit bind:value={user.accountType} on:submit={submit('accountType')}/>
								<!-- <InPlaceEdit bind:value={user.accountType} on:submit={submit('category')} categoryField={true} {userAccountTypes} /> -->
							  </td>
							  <td>
								<a href="#" class="ui icon button" on:click={() => updateUser(user)}>
									<i class="fas fa-edit"></i>
								</a>
								<a href="#" class="ui icon button" on:click={() => deleteUser(user._id)}>
									<i class="fas fa-trash"></i>
								</a>
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
