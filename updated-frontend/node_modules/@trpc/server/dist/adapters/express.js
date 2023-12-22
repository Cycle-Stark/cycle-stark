'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nodeHTTPRequestHandler = require('../nodeHTTPRequestHandler-477b8bae.js');
require('../index-784ff647.js');
require('../codes-87f6824b.js');
require('../resolveHTTPResponse-d17198ff.js');
require('../config-5b776b89.js');
require('../TRPCError-84cb03cf.js');
require('../transformTRPCResponse-e65f34e9.js');
require('../contentType-10776292.js');
require('../batchStreamFormatter-93cdcdd4.js');
require('./node-http/content-type/json/index.js');
require('../contentType-8c16408e.js');

function createExpressMiddleware(opts) {
    return async (req, res)=>{
        const endpoint = req.path.slice(1);
        await nodeHTTPRequestHandler.nodeHTTPRequestHandler({
            ...opts,
            req,
            res,
            path: endpoint
        });
    };
}

exports.createExpressMiddleware = createExpressMiddleware;
