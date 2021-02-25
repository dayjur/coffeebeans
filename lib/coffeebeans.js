'use strict';
const finalhandler = require('finalhandler');
const Router = require('router');
var serveStatic = require('serve-static');
const config = require('./config');
const requests = require('./requests');
const responses = require('./responses');
var router = Router();


// listen
module.exports.listen = function (req, res) {
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
};

// router
module.exports.router = router;


// process responses
module.exports.response = {
    // send text
    sendText: function (response, content, callback = null) {
        responses.sendText(response, content, () => {
            if (callback && typeof (callback) === 'function') {
                callback();
            }
        });
    },
    // send html
    sendHtml: function (response, content, callback = null) {
        responses.sendHtml(response, content, () => {
            if (callback && typeof (callback) === 'function') {
                callback();
            }
        });
    },
    // send json
    sendJson: function (response, content, callback = null) {
        responses.sendJson(response, content, () => {
            if (callback && typeof (callback) === 'function') {
                callback();
            }
        });
    },
    // render view
    renderView: function (response, filePath, callback = null) {
        responses.renderView(response, filePath, (err) => {
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
    parseForm: function (request, callback = null) {
        requests.parseForm(request, (err, body) => {
            if (callback && typeof (callback) === 'function') {
                callback(err,body);
            }
        });
    }
};


//  configuation options
exports.config = require('./config');














