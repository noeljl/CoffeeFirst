const expressLoader = require('./express');
const passportLoader = require('./passport');
const routeLoader = require('../routes');

module.exports = async (app) => {

  // Lädt Express middleware. Mehr dazu im ExpressLoader selbst.
  const expressApp = await expressLoader(app);

  // LÄdt Passport middleware 
  const passport = await passportLoader(expressApp);

  // Load RoutenHandler, ruft in routes die index.js auf, die die Routen initialisiert. Ohne das
  //  laufen die Routen nicht
  await routeLoader(app, passport);
  
  // Error Handler
  app.use((err, req, res, next) => {

    const { message, status } = err;
  
    return res.status(status).send({ message });
  });
}