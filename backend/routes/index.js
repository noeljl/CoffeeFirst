// index.js (in your routes folder)
import authRouter from './auth.js' // Make sure this path is correct for your auth routes
import coffeeShopRouter from './coffeeShop.js' // Make sure this path points to coffeeShopRoutes.js
import memberCardRouter from './memberCardRoute.js' // Make sure this path points to coffeeShopRoutes.js
import memberRouter from './memberRoute.js' // Make sure this path points to coffeeShopRoutes.js
import reviewRouter from './reviewRoute.js' // Make sure this path points to coffeeShopRoutes.js
import filterRouter from './filterRoute.js'

export default (app) => {
  app.use('/api/auth', authRouter)
  app.use('/api/coffeeshop', coffeeShopRouter)
  app.use('/api/memberCard', memberCardRouter)
  app.use('/api/member', memberRouter)
  app.use('/api/review', reviewRouter)
  app.use('/api/filter', filterRouter)
}
