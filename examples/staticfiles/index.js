const app = require('../..'); // for testing from this dir normally require('coffeebeans');

var routes = app.router(); // get a router


// serve static files in public folder
// localhost:3000 serve index.html  localhost:3000/download.png  serve png pic
app.use(app.serveStatic('public'));

// routes
routes.get('/api', (req, res) => {
    app.sendText('Api');
});

app.use(routes);


app.listen(process.env.PORT || 3000); // listen on platform assigned port or localhost:3000
