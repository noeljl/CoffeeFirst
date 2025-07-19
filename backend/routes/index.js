// index.js (in your routes folder)
import authRouter from './auth.js' // Make sure this path is correct for your auth routes
import coffeeShopRouter from './coffeeShop.js' // Make sure this path points to coffeeShopRoutes.js
import memberCardRouter from './memberCardRoute.js' // Make sure this path points to coffeeShopRoutes.js
import memberRouter from './memberRoute.js' // Make sure this path points to coffeeShopRoutes.js
import reviewRouter from './reviewRoute.js' // Make sure this path points to coffeeShopRoutes.js
import stripeRouter from './stripeRoute.js' // Make sure this path points to coffeeShopRoutes.js
import membershipRouter from './memberShipRoute.js'
import visitRouter from './visitRoute.js'

export default (app) => {
  app.use('/api/auth', authRouter)
  app.use('/api/coffeeshop', coffeeShopRouter)
  app.use('/api/memberCard', memberCardRouter)
  app.use('/api/membership', membershipRouter)
  app.use('/api/member', memberRouter)
  app.use('/api/review', reviewRouter)
  app.use('/api/stripe', stripeRouter)
  app.use('/api/visits', visitRouter)
}
