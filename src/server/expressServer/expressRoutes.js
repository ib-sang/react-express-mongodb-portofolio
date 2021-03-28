/**
 * Express Routes Module
 *
 * The route module handles all incoming requests to the server and routes appropriately
 * to the correct route functions.
*/

// Routes
const authRouters = require('./../routers/auth'); 

/**
 * Route Handler
 *
 * The function handles all routes and passes requests to their
 * appropriate route handler.
 *
 * @param {Object} app The express application
 */
const routes = app =>{
   
    // routes account
    app.use('/api/auth', authRouters);

} 

// Export the express routes module.
module.exports = routes;