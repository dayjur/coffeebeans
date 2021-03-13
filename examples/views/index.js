const app = require('../..'); // for testing from this dir normally require('coffeebeans');

var routes = app.router(); // get a router

// set routes

// render pages with html,ejs or pug

// render html view
routes.get('/html', (req, res) => { // localhost:3000/html
    app.renderHtml('index.html', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('page rendered');
        }
    });
});

// render pug view 
routes.get('/pug', (req, res) => { // localhost:3000/pug
    var locals = { name: 'Coffeebeans' }; //  optional can pass in data
    app.renderPug('index.pug', locals, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('page rendered');
        }
    });
});

// render ejs view
routes.get('/ejs', (req, res) => { // localhost:3000/ejs
    var locals = { name: 'coffeebeans' }; // optional pass in data
    app.renderEjs('index.ejs', locals, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('page rendered');
        }
    });
});




app.use(routes);


app.listen(process.env.PORT || 3000); // listen on platform assigned port or localhost:3000