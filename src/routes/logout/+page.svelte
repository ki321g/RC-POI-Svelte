<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentSession } from '$lib/stores';

	currentSession.set({ firstName: '', lastName: '', email: '', accountType: '', _id: '', token: '' });
	goto('/');
</script>
