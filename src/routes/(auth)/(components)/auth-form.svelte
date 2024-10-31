<script lang="ts">
	// import { Icons } from '$lib/components/docs/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { cn } from '$lib/components/utils.js';

	import autoAnimate, {
		type AnimationController,
		type AutoAnimateOptions
	} from '@formkit/auto-animate';

	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import GitHub from 'lucide-svelte/icons/github';

	const Icons = {
		spinner: LoaderCircle,
		github: GitHub
	};

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;
	async function onSubmit() {
		isLoading = true;

		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}

	class AutoAnimate {
		ref: HTMLElement | null = null;

		constructor() {
			return new Proxy(this, {
				set(target, prop, value, receiver) {
					if (prop === 'ref') {
						if (value instanceof HTMLElement) {
							receiver.ref = value;
							autoAnimate(receiver.ref);
						}
						return false;
					}

					return true; // Indicate that the assignment has been done correctly
				}
			});
		}
	}

	let btn = new AutoAnimate().ref;
</script>

<div class={cn('grid gap-6', className)} {...$$restProps}>
	<form on:submit|preventDefault={onSubmit}>
		<div class="grid gap-2">
			<div class="grid gap-1">
				<Label class="sr-only" for="email">Email</Label>
				<Input
					id="email"
					placeholder="name@example.com"
					type="email"
					autocapitalize="none"
					autocomplete="email"
					autocorrect="off"
					disabled={isLoading}
				/>
			</div>
			<Button type="submit" disabled={isLoading} bind:ref={btn}>
				{#if isLoading}
					<Icons.spinner class="h-4 w-4 animate-spin" />
				{/if}
				<span>Sign In with Email</span>
			</Button>
		</div>
	</form>
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t"></span>
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
		</div>
	</div>
	<Button variant="outline" type="button" disabled={isLoading}>
		<Icons.github class="h-4 w-4" />
		<span>GitHub</span>
	</Button>
</div>
