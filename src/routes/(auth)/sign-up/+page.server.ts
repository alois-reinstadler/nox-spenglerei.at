import { dev } from '$app/environment';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

import { hash } from '@node-rs/argon2';
import { generateRandomString } from '@oslojs/crypto/random';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	register: async (event) => {
		const formData = await event.request.formData();

		const email = formData.get('email');
		const password = formData.get('password');

		const firstName = formData.get('firstName');
		const lastName = formData.get('lastName');

		const avatar = formData.get('avatar');
		const phone = formData.get('phone');

		const { data, error } = auth.insertUserSchema.safeParse({
			email,
			password,

			firstName,
			lastName,

			avatar,
			phone
		});

		if (!data) {
			return fail(400, { message: error.message });
		}

		const userId = generateUserId();
		const passwordHash = await hash(data.password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await db.insert(table.user).values({
				id: userId,
				email: email,
				password: passwordHash,
				firstName,
				lastName,
				avatar,
				phone
			});

			const session = await auth.createSession(userId);
			event.cookies.set(auth.sessionCookieName, session.id, {
				path: '/',
				sameSite: 'lax',
				httpOnly: true,
				expires: session.expiresAt,
				secure: !dev
			});
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) {
			return fail(500, { message: 'An error has occurred' });
		}

		return redirect(302, '/app');
	}
};

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

function generateUserId(length = 21): string {
	return generateRandomString({ read: (bytes) => crypto.getRandomValues(bytes) }, alphabet, length);
}

// function validateUsername(username: unknown): username is string {
// 	return (
// 		typeof username === 'string' &&
// 		username.length >= 3 &&
// 		username.length <= 31 &&
// 		/^[a-z0-9_-]+$/.test(username)
// 	);
// }

// function validatePassword(password: unknown): password is string {
// 	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
// }
