const app = require('../..'); // for testing from this dir normally require('coffeebeans');

var routes = app.router(); // get a router

// set routes

// render pages with html,ejs or pug defalt engine is html

// render html view
routes.get('/html', (req, res) => { // localhost:3000/html
    app.renderView('index.html', (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('page rendered');
        }
    });
});

// render pug view
routes.get('/pug', (req, res) => { // localhost:3000/pug
    app.config.viewRenderer.engine = 'pug'; // set the viewRenderer engine to pug can use 'html','pug' or 'ejs'
    app.renderView('index.pug', (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('page rendered');
        }
    });
});

// render ejs view
routes.get('/ejs', (req, res) => { // localhost:3000/ejs
    app.config.viewRenderer.engine = 'ejs';
    app.renderView('index.ejs', (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('page rendered');
        }
    });
});




app.use(routes);


app.listen(process.env.PORT || 3000); // listen on platform assigned port or localhost:3000
