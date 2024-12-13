<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { cn } from '$lib/components/utils.js';

	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import Google from './google-logo.svelte';

	import autoanimate from '@formkit/auto-animate';

	import { get } from 'svelte/store';
	import { page } from '$app/stores';

	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	const params = get(page).url.searchParams;
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

	let firstName = $state(params.get('firstName') || '');
	let lastName = $state(params.get('lastName') || '');

	let email = $state(params.get('email') || '');

	let password = $state('');
	let passwordConfirm = $state('');

	let avatar = $state(params.get('avatar') || '');
	let googleId = $state(params.get('googleId') || '');
</script>

<div class={cn('grid gap-6', className)}>
	<form bind:this={ref} {...restProps} action="/sign-up?/register">
		<div class="grid gap-2">
			<div class="grid grid-cols-2 gap-2">
				<div class="grid gap-1">
					<Label class="sr-only" for="firstName">First name</Label>
					<Input
						bind:value={firstName}
						id="firstName"
						placeholder="First name"
						type="text"
						autocapitalize="on"
						autocomplete="name"
						autocorrect="off"
						disabled={isLoading}
					/>
				</div>

				<div class="grid gap-1">
					<Label class="sr-only" for="lastName">Last Name</Label>
					<Input
						bind:value={lastName}
						id="lastName"
						placeholder="Last Name"
						type="text"
						autocapitalize="on"
						autocomplete="name"
						autocorrect="off"
						disabled={isLoading}
					/>
				</div>
			</div>

			<div class="grid gap-1">
				<Label class="sr-only" for="email">Email</Label>
				<Input
					bind:value={email}
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
					bind:value={password}
					id="password"
					placeholder="Secure password"
					type="password"
					autocapitalize="none"
					autocomplete="off"
					autocorrect="off"
					disabled={isLoading}
				/>
			</div>
			<div class="grid gap-1">
				<Label class="sr-only" for="passwordConfirm">Confirm password</Label>
				<Input
					bind:value={passwordConfirm}
					id="passwordConfirm"
					placeholder="Confirm password"
					type="password"
					autocapitalize="none"
					autocomplete="off"
					autocorrect="off"
					disabled={isLoading}
				/>
			</div>

			<div class="hidden" aria-hidden="true">
				<Input
					bind:value={googleId}
					id="googleId"
					type="text"
					autocapitalize="none"
					autocomplete="off"
					autocorrect="off"
					disabled={isLoading}
				/>
				<Input
					bind:value={avatar}
					id="avatar"
					type="url"
					autocapitalize="none"
					autocomplete="off"
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
	{#if !googleId}
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
	{/if}
</div>
