/**
 * Config Module
 *
 * The application's config is exported here using the environment variables
 * passed to the application. Use docker compose files, .env files, or
 * kubernetes config files to store managed environments.
 */

// Comment out or remove the following line if you wish to deploy via a Docker image.
// This is set here to allow for using a .env file.
// require('dotenv').config();
const dotenv = require('dotenv')
const result = dotenv.config()
 
if (result.error) {
  throw result.error
}

const config = {

    // Environment name
    envName: process.env.NODE_ENV,
    // HTTP Port: Used for creating a HTTP server.
    httpPort: process.env.HTTP_PORT,
    // HTTPS Port: Used for creating a HTTPS server (not used in this demo).
    httpsPort: process.env.HTTPS_PORT,
    database: {
        // Database host: ip:port or server-name.tld:port
        host: process.env.DATABASE_HOST,
        // Database usename
        user: process.env.DATABASE_USERNAME,
        // Database user password
        password: process.env.DATABASE_PASSWORD,
        // MongoDB Database name
        database: process.env.DATABASE_NAME
    },
    frontend:{
        // React APP URL: http://localhost:3000
        baseURL: process.env.FRONTEND_BASEURL
    },
    authKeys: {

        google: {
          clientID: null,
          clientSecret: null
        },
        facebook: {
          clientID: null,
          clientSecret: null
        },
        github: {
          clientID: null,
          clientSecret: null
        },
        twitter: {
          clientID: null,
          clientSecret: null
        }
    
      },
    data: {
    
    }

}

module.exports = config;