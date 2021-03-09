const app = require('../..'); // for testing from this dir normally require('coffeebeans');

var routes = app.router(); // get a router

// ===========
// Basic login page where we parse form and read the username and password fields
routes.get('/login', (req, res) => {
    app.renderView('login.html'); // we post to /login 
});

routes.post('/login', (req, res) => {
    app.parseForm((err, body) => {
        if (err) {
            console.log('Could not parse form: ' + err)
        } else {
            console.log(body.fields);
            var username = body.fields.username;
            var password = body.fields.password;
            app.sendText('Your username=' + username + ' your password=' + password);
        }
    });
});

// =================
// Upload a file

// you can set the dir where uploaded files will go, defualt is os.tmpdir() ie platforms temp directory
// in this case we useing current directory
app.config.forms.uploadDir = __dirname;

routes.get('/upload', (req, res) => {
    app.renderView('upload.html');
});

routes.post('/upload', (req, res) => {
    // files uploaded will be given a unique id
    // you can then rename them move them etc using module 'fs'
    app.parseForm((err, body) => {
        if (err) {
            console.log('Could not parse form: ' + err)
        } else {
            var files = [];
            files = body.files.uploadedFiles; // 'uploadedFiles' is the name we gave in the form

            // if multiple files uploaded they will be stored as array
            if (Array.isArray(files)) {
                for (var i = 0; i < files.length; i++) {
                    console.log('Upload filename=' + files[i].name);
                    console.log('File path=' + files[i].path);
                }
            } else // single file upload
            {
                console.log('Upload filename=' + files.name);
                console.log('File path=' + files.path);
            }

            app.sendText('File(s) uploaded');

        }
    });
});

// use the routes
app.use(routes);

app.listen(process.env.PORT || 3000); // listen on platform assigned port or localhost:3000