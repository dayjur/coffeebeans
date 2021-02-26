const app = require('../..'); // for testing from this dir normally require('coffeebeans');

var routes = app.router(); // get a router

// set routes
routes.get('/', (req, res) => {
    app.sendText('Hello World!');// semd 'Hello World' to browser localhost:3000/ 
});

// use the routes
app.use(routes);

app.listen(process.env.PORT || 3000); // listen on platform assigned port or localhost:3000
