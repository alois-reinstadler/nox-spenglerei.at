import { dev } from '$app/environment';
import { google } from '$lib/server/oauth';
import { generateCodeVerifier, generateState } from 'arctic';

import type { RequestEvent } from './$types';
import { redirect } from '@sveltejs/kit';

export function GET(event: RequestEvent): Response {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = google.createAuthorizationURL(state, codeVerifier, ['openid', 'profile', 'email']);

	console.table({ state, codeVerifier });
	console.table(event.cookies.getAll());

	event.cookies.set('google_oauth_state', state, {
		path: '/',
		sameSite: 'lax',
		httpOnly: true,
		maxAge: 60 * 10,
		secure: !dev
	});

	event.cookies.set('google_code_verifier', codeVerifier, {
		path: '/',
		sameSite: 'lax',
		httpOnly: true,
		maxAge: 60 * 10,
		secure: !dev
	});

	return redirect(302, url.toString());
}
