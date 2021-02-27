const app=require('../../..') // for testing from this dir normally require('coffeebeans');

var apiRoutes=app.router();
apiRoutes.get('/', (req, res) => {
    app.sendText('api root'); // localhost:3000/api will display 'api root' in browser
});
apiRoutes.get('/dashboard', (req, res) => {
    app.sendText('api dashboard');  // localhost:3000/api/dashboard  will display 'api dashboard' in browser
});


module.exports=apiRoutes;