import { TRPCError } from '@trpc/server';
import { t } from './t';

import * as auth from '$lib/server/auth';

// export const protectedProcedure = t.procedure.use((options) => {
// 	if (!options.ctx.user || !options.ctx.session) {
// 		throw new TRPCError({ code: 'UNAUTHORIZED' });
// 	}

// 	return options.next({
// 		ctx: {
// 			user: options.ctx.user,
// 			session: options.ctx.session
// 		}
// 	});
// });
