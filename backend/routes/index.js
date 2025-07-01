import authRouter from './auth.js'

// prevenst that we have to /api/auth in front of all the routes in auth.js. Because technicall all paths start with /api/auth, but we dont want to
// write that for all paths
//remember: index.js is always the first file to be called in a folder. If someone calls the /routes-folder, index.js is meant.
export default (app) => {
  app.use('/api/auth', authRouter)
}
