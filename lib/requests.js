'use strict';
const formidable = require('formidable');
const config = require('./config');


// parse body
module.exports.parseForm = function (req, callback) {
    var form = formidable({ multiples: true, uploadDir: config.forms.uploadDir});

    form.parse(req, (err, fields, files) => {
        if (err) {
            if (callback && typeof (callback) === 'function') {
                callback(err, null);
            }
        }
        else {
            console.log('parsed body');
            var body = {};
            body.fields = fields;
            body.files = files;
            if (callback && typeof (callback) === 'function') {
                callback(null, body);
            }
        }
    });
};

