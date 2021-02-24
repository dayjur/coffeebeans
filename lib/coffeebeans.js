'use strict';
const finalhandler = require('finalhandler');
const Router = require('router');
var serveStatic = require('serve-static');
const config = require('./config');
const requests = require('./requests');
const responses = require('./responses');


var router = new Router();
// serve routes
function serveRoutes(req, res) {
    console.log('serving routes');
    router(req, res, (err) => {
        // no routes 
        if (err) {
            console.log('error:' + err);
        }
        else {
            serveStatic(config.staticFiles.get().path, config.staticFiles.get().options)(req, res, finalhandler(req, res));
        }

    });
};


// ===================== Exports =========================
// main entry
exports = module.exports = function (req, res) {
    console.log('init main');
    serveRoutes(req, res);

};

exports.use=function(middleware){
    router.use(middleware);
};

// post routes
exports.requestMethod = {
    GET: { 'method': 'GET' },
    PUT: { 'method': 'PUT' },
    POST: { 'method': 'POST' },
    DELETE: { 'method': 'DELETE' }
};

exports.route = function (url, requestMethod, callBack) {
    console.log('post route');

    if (requestMethod.method === 'GET') {
        router.get(url, function (req, res) {
            console.log('process response');
            responses.processResponse(res);
            callBack(req, res);
        });
    }

    if (requestMethod.method === 'POST') {
        router.post(url, function (req, res) {
            requests.processRequest(req, (err) => {
                if (err) {
                    console.log(err);
                    res.writeHead(200, 'content-type: text/plain; charset=utf-8');
                    res.end('Invalid post request: ' + err);
                }
                else {
                    console.log('process response');
                    responses.processResponse(res);
                    callBack(req, res);
                }
            });
        });
    }

    if (requestMethod.method === 'PUT') {
        router.put(url, function (req, res) {
            requests.processRequest(req, (err) => {
                if (err) {
                    console.log(err);
                    res.writeHead(200, 'content-type: text/plain; charset=utf-8');
                    res.end('Invalid post request: ' + err);
                }
                else {
                    console.log('process response');
                    responses.processResponse(res);
                    callBack(req, res);
                }
            });
        });
    }

    if (requestMethod.method === 'DELETE') {
        router.delete(url, function (req, res) {
            responses.processResponse(res);
            callBack(req, res);
        });
    }
};

// configuation options
exports.config = require('./config');














