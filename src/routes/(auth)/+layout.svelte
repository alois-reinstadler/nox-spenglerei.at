<script lang="ts">
	import Authentication from '$lib/img/authentication.avif?enhanced';

	import { IsMobile } from '$lib/components/hooks/is-mobile.svelte';

	const isMobile = new IsMobile();
	let { children } = $props();
</script>

<div class="background-overlay absolute inset-0 -z-50 h-full w-full"></div>

<div
	class="container relative hidden h-dvh flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<div
		class="relative hidden h-full flex-col overflow-hidden bg-muted p-10 text-white dark:border-r lg:flex"
	>
		{#if !isMobile.current}
			<enhanced:img
				src={Authentication}
				alt="Authentication"
				class="absolute inset-0 min-h-full min-w-full"
			/>
		{/if}

		<div class="relative z-20 flex items-center text-lg font-medium">
			<!-- <Command class="mr-2 h-6 w-6" /> -->
			Acme Inc
		</div>
		<div class="relative z-20 mt-auto">
			<blockquote class="space-y-2">
				<p class="text-lg">
					&ldquo;This library has saved me countless hours of work and helped me deliver stunning
					designs to my clients faster than ever before. Highly recommended!&rdquo;
				</p>
				<footer class="text-sm">Sofia Davis</footer>
			</blockquote>
		</div>
	</div>
	<div class="lg:p-8">
		{@render children()}
	</div>
</div>
