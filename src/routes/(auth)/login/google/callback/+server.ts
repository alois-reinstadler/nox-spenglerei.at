import { ObjectParser } from '@pilcrowjs/object-parser';
import { decodeIdToken } from 'arctic';

import { db } from '$lib/server/db';
import { google } from '$lib/server/oauth';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/auth';

import * as auth from '$lib/server/auth';
import * as table from '$lib/server/db/schema';

import { dev } from '$app/environment';
import { redirect, error } from '@sveltejs/kit';

import type { RequestEvent } from './$types';
import type { OAuth2Tokens } from 'arctic';

export async function GET(event: RequestEvent): Promise<Response> {
	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const codeVerifier = event.cookies.get('google_code_verifier') ?? null;

	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');

	if (storedState === null || codeVerifier === null || code === null || state === null) {
		return error(400, 'Please restart the process.');
	}

	if (storedState !== state) {
		return error(400, 'Please restart the process.');
	}

	let tokens: OAuth2Tokens;

	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		return error(400, 'Please restart the process.');
	}

	const claims = decodeIdToken(tokens.idToken());
	const claimsParser = new ObjectParser(claims);

	const email = claimsParser.getString('email');
	const googleId = claimsParser.getString('sub');
	const name = claimsParser.getString('name');
	const picture = claimsParser.getString('picture');

	const existingUser = await db.query.user.findFirst({
		where: (table, { eq, or }) => or(eq(table.googleId, googleId), eq(table.email, email))
	});

	if (!existingUser) {
		// redirect to sign-up with oauth information
		return redirect(302, '/sign-up?');
	}

	const session = await createSession(existingUser.id);
	event.cookies.set(auth.sessionCookieName, session.id, {
		path: '/',
		sameSite: 'lax',
		httpOnly: true,
		expires: session.expiresAt,
		secure: !dev
	});

	return redirect(302, '/app');
}
