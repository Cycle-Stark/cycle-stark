'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var http = require('node:http');
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

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var http__default = /*#__PURE__*/_interopDefaultLegacy(http);

function createHTTPHandler(opts) {
    return async (req, res)=>{
        // if no hostname, set a dummy one
        const href = req.url.startsWith('/') ? `http://127.0.0.1${req.url}` : req.url;
        // get procedure path and remove the leading slash
        // /procedure -> procedure
        const path = new URL(href).pathname.slice(1);
        await nodeHTTPRequestHandler.nodeHTTPRequestHandler({
            ...opts,
            req,
            res,
            path
        });
    };
}
function createHTTPServer(opts) {
    const handler = createHTTPHandler(opts);
    const server = http__default["default"].createServer((req, res)=>handler(req, res));
    return {
        server,
        listen: (port, hostname)=>{
            server.listen(port, hostname);
            const actualPort = port === 0 ? server.address().port : port;
            return {
                port: actualPort
            };
        }
    };
}

exports.createHTTPHandler = createHTTPHandler;
exports.createHTTPServer = createHTTPServer;
