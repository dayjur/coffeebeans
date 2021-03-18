const app = require("../.."); // for testing from this dir normally require('coffeebeans');

var routes = app.router(); // get a router

// set routes

// get query string params
routes.get("/", (req, res) => { // go to http://localhost:3000/?firstname=jon&secondname=doe
  var qs = app.parseQueryString();
  console.log(qs.firstname + " " + qs.secondname);
});

// use the routes
app.use(routes);

app.listen(process.env.PORT || 3000); // listen on platform assigned port or localhost:3000
