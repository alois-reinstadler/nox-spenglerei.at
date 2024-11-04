<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import UserAuthForm from '../(components)/auth-form.svelte';
</script>

<Button
	href="/sign-up"
	variant="ghost"
	class="absolute right-4 top-4 font-display md:right-8 md:top-8"
>
	Sign-up
</Button>

<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
	<div class="flex flex-col space-y-2 text-center">
		<h1 class="font-display text-2xl font-semibold">Login to your account</h1>
		<p class="text-sm text-muted-foreground">
			Enter your email and password to login to your account
		</p>
	</div>
	<UserAuthForm />
	<p class="px-8 text-center text-sm text-muted-foreground">
		By clicking continue, you agree to our
		<a href="/terms" class="underline underline-offset-4 hover:text-primary"> Terms of Service </a>
		and
		<a href="/privacy" class="underline underline-offset-4 hover:text-primary"> Privacy Policy </a>
		.
	</p>
</div>
