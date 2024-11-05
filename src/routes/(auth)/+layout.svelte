<script lang="ts">
	import AuthLayout from './(components)/auth-layout-02.svelte';
	let { children } = $props();
</script>

<AuthLayout>
	{@render children()}
</AuthLayout>
