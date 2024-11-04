<script lang="ts" module>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	export type MarqueeProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		pauseOnHover?: boolean;
		vertical?: boolean;
		repeat?: number;
		reverse?: boolean;
	};
</script>

<script lang="ts">
	import { cn } from '$lib/components/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		pauseOnHover = false,
		vertical = false,
		repeat = 4,
		reverse = false,
		children,
		...restProps
	}: MarqueeProps = $props();
</script>

<div
	bind:this={ref}
	class={cn(
		'group flex overflow-hidden p-2 [--duration:2s] [--gap:1rem] [gap:var(--gap)]',
		{
			'flex-row': !vertical,
			'flex-col': vertical
		},
		className
	)}
	{...restProps}
>
	{#each { length: repeat } as _, i (i)}
		<div
			class={cn('flex shrink-0 justify-around [gap:var(--gap)]', {
				'animate-marquee flex-row': !vertical,
				'animate-marquee-vertical flex-col': vertical,
				'group-hover:[animation-play-state:paused]': pauseOnHover,
				'[animation-direction:reverse]': reverse
			})}
		>
			{@render children?.()}
		</div>
	{/each}
</div>
