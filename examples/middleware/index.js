const app = require('../..'); // for testing from this dir normally require('coffeebeans');

var routes = app.router(); // get a router


// set middleware before routes

// 3rd party middleware example popular body-parser will
//  extract the entire body portion of an incoming request stream and exposes it on req.body
// for example login page one can access the username and password in a post route in req.body

//const bodyParser = require('body-parser');
//app.use(bodyParser.json());

function addVar(req,res,next) // here we create a function that adds testVar to request
{
req.testVar='OK';
next(); // go to the next middleware in the stack which in this case will be our routes as we not using any more middleware
};

app.use(addVar); // now we use the above function



// set routes

// going to each of the routes below we can see OK will be displayed as testVar was set in above middleware
routes.get('/', (req, res) => {  
  app.sendText(req.testVar); 
});

routes.get('/another', (req, res) => {  
    app.sendText(req.testVar); 
  });
  

  // middlware ware on a selected route
  // here we add newVar to request on /midewaretest route only
  function midware(req,res,next)
  {
      req.newVar='123';
      next(); // move to next middleware stack which in this care is selected route /midwaretest
  }
  routes.get('/midwaretest',midware,(req,res)=>{
      app.sendText(req.newVar);
  });



// use the routes
app.use(routes);

app.listen(process.env.PORT || 3000); // listen on platform assigned port or localhost:3000