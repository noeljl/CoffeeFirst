import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session' // npm install express-session
import { SESSION_SECRET } from '../config.js'
import express from 'express'

const expressLoader = (app) => {
  // CORS for local development.
  // cors enables Cross-Origin Resource Sharing, so your frontend (on a different port) can talk to your backend.
  // Cors is to prevent malicious websites from accessing sensitive data from other websites without your permission.
  app.use(
    cors({
      origin: 'http://localhost:3000', // Where you can access from ?
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], //With which methods?
      allowedHeaders: ['Authorization', 'Content-Type'], //The browser first sends a "preflight" request (an OPTIONS request) to ask the backend: "Am I allowed to send the Authorization and Content-Type headers?"
      credentials: true, // "It's okay to include credentials like cookies, authorization headers, or TLS client certificates with this request."
    })
  )

  // Serve static files from the public directory
  app.use(express.static('public'))

  // Body-Parsing- These lines enable Express to handle: JSON bodies (e.g. from fetch or Axios) URL-encoded data (e.g. from HTML forms)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Session-Handling
  app.set('trust proxy', 1) // This tells Express to trust headers set by a reverse proxy (e.g. if you're using Nginx or Heroku). Required if your app sits behind a proxy and uses cookies or secure sessions.
  app.use(
    //This enables session handling in your Express app using express-session. It keeps track of users (e.g. login sessions) using a session ID stored in a cookie.
    session({
      secret: SESSION_SECRET, //This secret is used to sign the session ID cookie so it can't be tampered with. You should store this value in your .env file and never expose it.
      resave: false, //This prevents sessions from being saved back to the store if they haven't changed. It's a performance optimization and a best practice.
      saveUninitialized: false, //This avoids storing sessions that are empty (no data in them). Useful to avoid creating sessions for unauthenticated users or bots.
      cookie: {
        //This object contains configuration for the cookie that stores the session ID in the user's browser.
        secure: false, // If true, the cookie is only sent over HTTPS. Since we are in development on localhost, it's set to false.
        httpOnly: true, //Prevents JavaScript on the frontend (e.g. in the browser) from accessing the cookie. This protects against XSS (Cross-Site Scripting) attacks.
        sameSite: 'lax', //This helps prevent CSRF (Cross-Site Request Forgery) by restricting when cookies are sent across sites.
        maxAge: 24 * 60 * 60 * 1000, //This sets the cookie's expiration time to 24 hours (in milliseconds).
      },
    })
  )

  return app
}

export default expressLoader
