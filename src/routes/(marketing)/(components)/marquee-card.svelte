<script lang="ts" module>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { GoogleReview } from '$lib/static/google-reviews';

	export type ReviewCardProps = WithElementRef<HTMLAttributes<HTMLElement>> & GoogleReview;
</script>

<script lang="ts">
	import { cn } from '$lib/components/utils.js';
	import Star from 'lucide-svelte/icons/star';

	let {
		ref = $bindable(null),
		name,
		rating,
		content,
		picture,
		class: className,
		children,
		...restProps
	}: ReviewCardProps = $props();
</script>

<figure
	bind:this={ref}
	{...restProps}
	class={cn(
		'relative w-64 cursor-pointer overflow-hidden rounded-2xl border p-4',
		// light styles
		'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
		// dark styles
		'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
		className
	)}
>
	<div class="flex flex-row items-center gap-2">
		<img
			class="rounded-full"
			width="32"
			height="32"
			alt=""
			src={picture || `https://avatar.vercel.sh/${name}`}
		/>
		<div class="flex flex-col">
			<!-- svelte-ignore a11y_figcaption_parent -->
			<figcaption class="text-sm font-medium dark:text-white">
				{name}
			</figcaption>
			<p class="inline-flex text-xs font-medium dark:text-white/40">
				{#each new Array(rating) as e, i (i)}
					<Star class="h-4 w-4 fill-yellow-300" strokeWidth="1" />
				{/each}
			</p>
		</div>
	</div>
	<blockquote class="mt-2 line-clamp-3 text-ellipsis text-pretty text-sm">{content}</blockquote>
</figure>
