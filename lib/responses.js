'use strict';

const config = require('./config');
const fs = require('fs');
const pug = require('pug');
const ejs = require('ejs');


exports.sendText = function(res, content) {

    if (!res.getHeader('Content-Type')) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    }
    if (!res.getHeader('X-Powered-By')) {
        res.setHeader('X-Powered-By', 'coffeebeans');
    }
    res.write(content);
    res.end();

};

exports.sendHtml = function(res, content) {

    if (!res.getHeader('Content-Type')) {
        res.setHeader('Content-Type', 'text/html, charset=utf-8');
    }
    if (!res.getHeader('X-Powered-By')) {
        res.setHeader('X-Powered-By', 'coffeebeans');
    }

    res.write(content);
    res.end();

};

exports.sendJson = function(res, content) {

    if (!res.getHeader('Content-Type')) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
    }
    if (!res.getHeader('X-Powered-By')) {
        res.setHeader('X-Powered-By', 'coffeebeans');
    }


    res.write(JSON.stringify(content));
    res.end();

};


// redner html
module.exports.renderHtml = function(res, filePath, callback) {

    fs.readFile(filePath, null, function(err, data) {
        if (err) {
            if (callback && typeof(callback) === 'function') {
                callback(err);
            }
            res.end();
        } else {
            if (!res.getHeader('Content-Type')) {
                res.setHeader('Content-Type', 'text/html, charset=utf-8');
            }
            if (!res.getHeader('X-Powered-By')) {
                res.setHeader('X-Powered-By', 'coffeebeans');
            }
            res.write(data);
            res.end();
            if (callback && typeof(callback) === 'function') {
                callback();
            }
        }

    });
}

// render pug
module.exports.renderPug = function(res, filePath, locals, callback) {
    if (typeof(locals) === 'function') {
        var html = pug.renderFile(filePath);
    } else {
        var html = pug.renderFile(filePath, locals);
    }

    if (!res.getHeader('Content-Type')) {
        res.setHeader('Content-Type', 'text/html, charset=utf-8');
    }
    if (!res.getHeader('X-Powered-By')) {
        res.setHeader('X-Powered-By', 'coffeebeans');
    }
    res.write(html);
    res.end();
    if (callback && typeof(callback) === 'function') {
        callback();
    }
}

// render ejs
module.exports.renderEjs = function(res, filePath, data, options, callback) {
    ejs.renderFile(filePath, data, options, function(err, html) {

        if (err) {
            if (callback && typeof(callback) === 'function') {
                callback(err);
            }
            res.end();
        } else {

            if (!res.getHeader('Content-Type')) {
                res.setHeader('Content-Type', 'text/html, charset=utf-8');
            }
            if (!res.getHeader('X-Powered-By')) {
                res.setHeader('X-Powered-By', 'coffeebeans');
            }

            res.write(html);
            res.end();
            if (callback && typeof(callback) === 'function') {
                callback();
            }
        }
    });

}