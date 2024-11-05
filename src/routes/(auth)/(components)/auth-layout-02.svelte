<script lang="ts">
	import { Globe } from '$lib/components/ui/globe';
	import { IsMobile } from '$lib/components/hooks/is-mobile.svelte';

	import type { Snippet } from 'svelte';

	const isMobile = new IsMobile();
	let { children }: Record<'children', Snippet> = $props();
</script>

<div class="background-overlay absolute inset-0 -z-50 h-full w-full"></div>

<div
	class="container relative hidden h-dvh flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<div
		class="relative hidden h-full flex-col items-start justify-between overflow-hidden p-10 text-primary lg:flex"
	>
		<div class="relative z-20 flex font-display text-3xl font-medium tracking-wide">
			QUALITÄT SICHER UNSERE ZUKUNFT
		</div>
		{#if !isMobile.current}
			<Globe class="relative mx-auto aspect-square w-full" />
		{/if}
		<div class="relative z-20">
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
