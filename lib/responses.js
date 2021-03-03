'use strict';

const config = require('./config');
const fs = require('fs');
const pug = require('pug');
const ejs = require('ejs');


exports.sendText = function (res, content) {

    if (!res.getHeader('Content-Type')) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    }
    if (!res.getHeader('X-Powered-By')) {
        res.setHeader('X-Powered-By', 'coffeebeans');
    }
    res.write(content);
    res.end();

};

exports.sendHtml = function (res, content) {

    if (!res.getHeader('Content-Type')) {
        res.setHeader('Content-Type', 'text/html, charset=utf-8');
    }
    if (!res.getHeader('X-Powered-By')) {
        res.setHeader('X-Powered-By', 'coffeebeans');
    }

    res.write(content);
    res.end();

};

exports.sendJson = function (res, content) {

    if (!res.getHeader('Content-Type')) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
    }
    if (!res.getHeader('X-Powered-By')) {
        res.setHeader('X-Powered-By', 'coffeebeans');
    }


    res.write(JSON.stringify(content));
    res.end();

};

exports.renderView = function (res, filePath, callback) {
    // html
    if (config.viewRenderer.engine === 'html') {
        var hdrsCount = Object.keys(res.getHeaders()).length;
      
        if (!res.getHeader('Content-Type')) {
            res.setHeader('Content-Type', 'text/html, charset=utf-8');
        }
        if (!res.getHeader('X-Powered-By')) {
            res.setHeader('X-Powered-By', 'coffeebeans');
        }
    

        fs.readFile(filePath, null, function (err, data) {
            if (err) {
                if (callback && typeof (callback) === 'function') {
                    callback(err);
                }
                res.end();
            }
            else {
                res.write(data);
                res.end();
                if (callback && typeof (callback) === 'function') {
                    callback();
                }
            }

        });
        return;
    };

    // pug
    if (config.viewRenderer.engine === 'pug') {
        var html = pug.renderFile(filePath);
        var hdrsCount = Object.keys(res.getHeaders()).length;

        if (!res.getHeader('Content-Type')) {
            res.setHeader('Content-Type', 'text/html, charset=utf-8');
        }
        if (!res.getHeader('X-Powered-By')) {
            res.setHeader('X-Powered-By', 'coffeebeans');
        }

        res.write(html);
        res.end();
        if (callback && typeof (callback) === 'function') {
            callback();
        }
        return;
    };

    // ejs
    if (config.viewRenderer.engine === 'ejs') {
        ejs.renderFile(filePath, null, null, function (err, html) {
            if (err) {
                if (callback && typeof (callback) === 'function') {
                    callback(err);
                }
                res.end();
            }
            else {

                if (!res.getHeader('Content-Type')) {
                    res.setHeader('Content-Type', 'text/html, charset=utf-8');
                }
                if (!res.getHeader('X-Powered-By')) {
                    res.setHeader('X-Powered-By', 'coffeebeans');
                }

                res.write(html);
                res.end();
                if (callback && typeof (callback) === 'function') {
                    callback();
                }
            }
        })
        return;
    };

    console.log('No renderer set use html,pug or ejs');

}

