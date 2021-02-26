const app=require('../..'); // for testing from this dir normally require('coffeebeans');

var routes=app.router; // get the router

// semd 'Hello World' to browser localhost:3000/ 
routes.get('/', (req, res) => {
    app.response.sendText('Hello World!');
    });


app.listen(process.env.PORT || 3000); // listen on platform assigned port or localhost:3000
