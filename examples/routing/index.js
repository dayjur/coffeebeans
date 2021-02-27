const app = require('../..');

// ===== Create some routes from '/' =====
var baseRoutes = app.router(); // get a router
// set some routes
baseRoutes.get('/', (req, res) => {
    app.sendText('root'); // localhost:3000 will display 'root' in browser
});
baseRoutes.get('/login', (req, res) => {
    app.sendText('Login');  // localhost:3000/login will display 'Login' in browser
});
// use the routes
app.use(baseRoutes);

// ===== Mount some routes to /help path =====
var helpRoutes = app.router();
helpRoutes.get('/', (req, res) => {
    app.sendText('help'); // localhost:3000/help will display 'help' in browser
});
helpRoutes.get('/support', (req, res) => {
    app.sendText('help>support'); // localhost:3000/help/support will display 'help>support' in browser
});
app.use('/help', helpRoutes);

// ==== Use some routes created in routes/api.js =====
var apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);




app.listen(3000) // localhost:3000
