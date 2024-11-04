<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { cn } from '$lib/components/utils.js';

	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	import autoanimate from '@formkit/auto-animate';

	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import Google from './google-logo.svelte';

	let isLoading = $state(false);

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLFormElement>> = $props();

	const Icons = {
		spinner: LoaderCircle,
		google: Google
	};
</script>

<div class={cn('grid gap-6', className)}>
	<form bind:this={ref} {...restProps} on:submit|preventDefault={onsubmit}>
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
			<div class="grid gap-1">
				<Label class="sr-only" for="password">Password</Label>
				<Input
					id="password"
					placeholder="password"
					type="password"
					autocapitalize="none"
					autocomplete="current-password"
					autocorrect="off"
					disabled={isLoading}
				/>
			</div>
			<Button type="submit" disabled={isLoading} use={autoanimate}>
				{#if isLoading}
					<Icons.spinner class="h-4 w-4 animate-spin" />
				{/if}
				<span>Sign up with E-Mail</span>
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
	<Button href="/login/google" variant="outline" type="button" disabled={isLoading}>
		<Icons.google class="h-4 w-4" />
		<span>Google</span>
	</Button>
</div>
