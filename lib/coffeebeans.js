'use strict';
const finalhandler = require('finalhandler');
const Router = require('router');
var serveStatic = require('serve-static');
const config = require('./config');
const requests = require('./requests');
const responses = require('./responses');
const http = require('http');

var router = Router();
var server = http.Server;
var _request;
var _response;


// listen
module.exports.listen = function (port) {
    server = http.createServer(function (req, res) {
        _request=req;_response=res;
        console.log('Received request');
        router(req, res, (err) => {
            // no routes 
            if (err) { // if error
                console.log('error:' + err);
            }
            else { // else server static files
                serveStatic(config.staticFiles.get().path, config.staticFiles.get().options)(req, res, finalhandler(req, res));
            }

        });
    });
    server.listen(port);

};

// router
module.exports.router = router;

// middleware use
module.exports.use=function(middleware)
{
    router.use(middleware);
}

// process responses
module.exports.response = {
    // send text
    sendText: function (content, callback = null) {
        responses.sendText(_response, content, () => {
            if (callback && typeof (callback) === 'function') {
                callback();
            }
        });
    },
    // send html
    sendHtml: function (content, callback = null) {
        responses.sendHtml(_response, content, () => {
            if (callback && typeof (callback) === 'function') {
                callback();
            }
        });
    },
    // send json
    sendJson: function (content, callback = null) {
        responses.sendJson(_response, content, () => {
            if (callback && typeof (callback) === 'function') {
                callback();
            }
        });
    },
    // render view
    renderView: function (filePath, callback = null) {
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
};

// process requests
module.exports.request = {
    parseForm: function (callback = null) {
        requests.parseForm(_request, (err, body) => {
            if (callback && typeof (callback) === 'function') {
                callback(err, body);
            }
        });
    },

    parseQueryString: function () {
        var queryString = requests.parseQueryString(_request);
        return queryString;
    }
};



//  configuation options
exports.config = require('./config');














