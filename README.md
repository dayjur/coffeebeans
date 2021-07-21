# coffeebeans
An easy to use framework for serving web pages on node.js, desgined in mind for newcomers to quickly get up and running.

## Get started
`npm install coffeebeans`

## Hello world
```js
const app = require('coffeebeans'); 

var routes = app.router(); // get a router

// set routes
routes.get('/', (req, res) => {
    app.sendText('Hello World!');// semd 'Hello World' to browser localhost:3000/ 
});

// use the routes
app.use(routes);

app.listen(process.env.PORT || 3000); // listen on platform assigned port or localhost:3000
```

### For more commented examples check the examples folder.

