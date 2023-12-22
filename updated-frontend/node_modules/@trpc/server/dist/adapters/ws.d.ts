/// <reference types="node" />
/// <reference types="node" />
import { IncomingMessage } from 'http';
import ws from 'ws';
import { AnyRouter } from '../core';
import { BaseHandlerOptions } from '../internals/types';
import { NodeHTTPCreateContextFnOptions, NodeHTTPCreateContextOption } from './node-http';
/**
 * Web socket server handler
 */
export type WSSHandlerOptions<TRouter extends AnyRouter> = BaseHandlerOptions<TRouter, IncomingMessage> & NodeHTTPCreateContextOption<TRouter, IncomingMessage, ws> & {
    wss: ws.Server;
    process?: NodeJS.Process;
};
export type CreateWSSContextFnOptions = NodeHTTPCreateContextFnOptions<IncomingMessage, ws>;
export declare function applyWSSHandler<TRouter extends AnyRouter>(opts: WSSHandlerOptions<TRouter>): {
    broadcastReconnectNotification: () => void;
};
//# sourceMappingURL=ws.d.ts.map