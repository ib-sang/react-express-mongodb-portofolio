/**
 * Database Module
 *
 * Handle database actions for the application.
*/

const mongoose = require('mongoose');

// Create the Database Module.
const database = {};

// Config
const config = require("./../config");

// Shorthand for database proprties.
const db = config.database;


/**
 * Connect to the database
 *
 * Attempt to connect to the database with the credentials and database provided. Make
 * sure we use "useNewUrlParser" in the options due to Mongo v4.
 */
database.connect = () =>{
    // Return a promise (resolved) after a successful connection, or reject
    // if there was an error connecting to the database.
    return new Promise((resolve, reject) =>{
        mongoose.connect(
            //'mongodb+srv://'+db.user+':'+db.password+db.host+'/'+db.database+'?retryWrites=true&w=majority',
            'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
            { useNewUrlParser: true }

        )
        .then(()=>{
            resolve();
        })
        .catch(err =>{
            reject(err)
        })
    })
}

module.exports = database;