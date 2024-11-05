import { TRPCError } from '@trpc/server';
import { t } from './t';

// import { validateSession } from "$lib/server/auth";

export const protectedProcedure = t.procedure.use((options) => {
	if (!options.ctx.locals.user || !options.ctx.locals.session) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return options.next({
		ctx: {
			user: options.ctx.locals.user,
			session: options.ctx.locals.session
		}
	});
});

export const router = t.router({
	greeting: t.procedure.query(async () => {
		return `Hello tRPC v10 @ ${new Date().toLocaleTimeString()}`;
	})
});

export const createCaller = t.createCallerFactory(router);
export type Router = typeof router;
