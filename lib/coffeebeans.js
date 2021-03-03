'use strict';
const finalhandler = require('finalhandler');
const Router = require('router');
var serveStatic = require('serve-static');
const config = require('./config');
const requests = require('./requests');
const responses = require('./responses');
const http = require('http');

var _router = Router();
var _server;
var _request;
var _response;


// listen
module.exports.listen = function (port) {
    _server = http.createServer(function (req, res) {
        _request = req; _response = res;
        console.log('Received request');
        _router(req,res,finalhandler(req,res));
    });
    _server.listen(port);

};


// router
module.exports.router = require('router');

// middleware use
module.exports.use = function (path, middleware) {
    if (arguments.length == 2) {
        _router.use(path, middleware);
    }
    if (arguments.length == 1) {
        _router.use(path);
    }

};


// send text response
module.exports.sendText = function (content) {
    responses.sendText(_response, content);
};

// send html response
module.exports.sendHtml = function (content) {
    responses.sendHtml(_response, content);
};

// send Json response
module.exports.sendJson = function (content) {
    responses.sendJson(_response, content);
};

// render view and send in response
module.exports.renderView = function (filePath, callback) {
    responses.renderView(_response, filePath, (err) => {
        if (callback && typeof (callback) === 'function') {
            if (err) {
                if (callback && typeof (callback) === 'function') {
                    callback(err);
                }
            }
            else {
                if (callback && typeof (callback) === 'function') {
                    callback();
                }
            }
        }
    });
}


// parse form sent in request
module.exports.parseForm = function (callback) {
    requests.parseForm(_request, (err, body) => {
        if (callback && typeof (callback) === 'function') {
            callback(err, body);
        }
    });
};

// parse query string sent in request
module.exports.parseQueryString = function () {
    var queryString = requests.parseQueryString(_request);
    return queryString;
}

// serve static
module.exports.serverStatic=require('serve-static');

//  configuation options
exports.config = require('./config');













