import * as auth from '$lib/server/auth';
import { createContext } from '$lib/server/trpc/context';
import { router } from '$lib/server/trpc/router';

import { dev } from '$app/environment';

import { createTRPCHandle } from 'trpc-sveltekit';

import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(auth.sessionCookieName);

	if (!sessionId) {
		if (event.url.pathname.startsWith('/app')) return redirect(302, '/login');
		event.locals.user = null;
		event.locals.session = null;

		return resolve(event);
	}

	const { session, user } = await auth.validateSession(sessionId);

	if (session) {
		if (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/sign-up'))
			return redirect(302, '/app');

		event.cookies.set(auth.sessionCookieName, session.id, {
			path: '/',
			sameSite: 'lax',
			httpOnly: true,
			expires: session.expiresAt,
			secure: !dev
		});
	} else {
		event.cookies.delete(auth.sessionCookieName, { path: '/' });
		if (event.url.pathname.startsWith('/app')) return redirect(302, '/login');
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};

const handleTRPC: Handle = createTRPCHandle({ router, createContext });
export const handle: Handle = sequence(handleAuth, handleTRPC);
