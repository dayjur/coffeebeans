const app = require('../..'); // for testing from this dir normally require('coffeebeans');

var routes = app.router(); // get a router

// set routes

// send some text
routes.get('/text', (req, res) => {
    app.sendText('Some text'); // go to localhost:3000/text and 'some text' will be displayed
});

// send some Json
routes.get('/json', (req, res) => {
    var obj={};
    obj.firstName='John';
    obj.lastName='Doe'
    app.sendJson(obj); // // go to localhost:3000/json and {"firstName":"John","lastName":"Doe"} will be displayed
});

// send some html
routes.get('/html', (req, res) => {
    var html='<h1>This is some html</h1?';
    app.sendHtml(html); // // go to localhost:3000/html and This is some html will be displayed using h1 header
});



// use the routes
app.use(routes);

app.listen(process.env.PORT || 3000); // listen on platform assigned port or localhost:3000
