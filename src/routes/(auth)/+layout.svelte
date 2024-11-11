<script lang="ts">
	import AuthLayout from './(components)/auth-layout-01.svelte';
	let { children } = $props();
</script>

<AuthLayout>
	{@render children()}
</AuthLayout>
