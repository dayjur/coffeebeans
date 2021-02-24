'use strict';

const config = require('./config');
const fs = require('fs');
const pug = require('pug');
const ejs = require('ejs');

// ============ Process response ===============
function processResponse(res) {
    // expoese res.text
    res.sendText = function (content) {
        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
            'X-Powered-By': 'nodebullet'
        });
        res.write(content);
        res.end();
    };
    // epxos html
    res.sendHtml = function (content) {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
            'X-Powered-By': 'nodebullet'
        });
        res.write(content);
        res.end();
    };
    // epxose res.json
    res.sendJson = function (content) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Powered-By': 'nodebullet'
        });
        res.write(JSON.stringify(content));
        res.end();

    };

    // epxose res.render
    res.sendView = function (filePath, callBack) {
     
        switch (config.viewRenderer.engine) {
            // === html
            case 'html':
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8',
                    'X-Powered-By': 'nodebullet'
                });
                fs.readFile(filePath, null, function (err, data) {
                    if (err) {
                        callBack(err);
                    }
                    else {
                        res.write(data);
                        res.end();
                    }
                });
                break;
            // === pug
            case 'pug':
                var html = pug.renderFile(filePath);
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8',
                    'X-Powered-By': 'nodebullet'
                });
                res.write(html);
                res.end();
                break;
            case 'ejs':
                ejs.renderFile(filePath, null, null, function (err, html) {
                    if (err) {
                        callback(err);
                    }
                    else {
                        res.writeHead(200, {
                            'Content-Type': 'text/html; charset=utf-8',
                            'X-Powered-By': 'nodebullet'
                        });
                        res.write(html);
                        res.end();
                    }
                })
                break;
            default:
                console.log('no renderer set use html,pug or ejs');
        }

    }
};

module.exports.processResponse = processResponse;