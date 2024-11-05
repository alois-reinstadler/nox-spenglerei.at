import type { Snippet } from 'svelte';

type LayoutProps<
	Data extends Record<string, unknown> | undefined = undefined,
	T extends Record<string, unknown> = Record<never, unknown>
> = Data extends undefined
	? T & {
			children: Snippet;
		}
	: T & {
			data: Data;
			children: Snippet;
		};
