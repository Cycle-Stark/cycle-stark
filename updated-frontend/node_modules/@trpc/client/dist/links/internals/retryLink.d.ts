import { AnyRouter } from '@trpc/server';
import { TRPCLink } from '../types';
/**
 * @internal used for testing
 */
export declare function retryLink<TRouter extends AnyRouter = AnyRouter>(opts: {
    attempts: number;
}): TRPCLink<TRouter>;
//# sourceMappingURL=retryLink.d.ts.map