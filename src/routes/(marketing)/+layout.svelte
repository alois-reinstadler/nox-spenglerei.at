<script lang="ts">
	let { children } = $props();
</script>

<div class="background-overlay absolute inset-0 -z-50 h-full w-full"></div>

{@render children()}
