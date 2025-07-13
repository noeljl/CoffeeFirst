import express from "express";
const stripeRouter = express.Router();
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../config.js";

const stripe = new Stripe(STRIPE_SECRET_KEY);

stripeRouter.get("/products", async (req, res) => {
    try {
        // Fetch all products
        const products = await stripe.products.list({limit: 100});
        // For each product, fetch its default price
        const productData = await Promise.all(
            products.data.map(async (product) => {
              let price = null;
              if (product.default_price) {
                // Fetch the price object using the default_price ID
                price = await stripe.prices.retrieve(product.default_price);
              }
              return {
                name: product.name,
                price: price ? (price.unit_amount / 100).toFixed(2) : null, // e.g., 29.99
                currency: price ? price.currency.toUpperCase() : null
              };
            })
          );
          res.json(productData);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});

stripeRouter.get('/checkout/subscribe', async (req, res) => {
    try {
        const plan = req.query.plan;

        if (!plan) {
            return res.status(400).json({ error: 'Subscription plan not found' });
        }

        let priceId;

        switch(plan.toLowerCase()) {
            case 'silver':
                priceId = 'price_1RiuEbPKWEn89dJtzl13elZS';
                break;
            case 'gold':
                priceId = 'price_1RiuF2PKWEn89dJtmN1BqwrV';
                break;
            case 'black':
                priceId = 'price_1RiuFJPKWEn89dJtpg72oveX';
                break;
            default:
                return res.status(400).json({ error: 'Invalid subscription plan' });
        }

        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'subscription',
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/signup/completed?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/cancel`,
        });

        res.json({ sessionId: session.id, url: session.url });
        
    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ error: error.message });
    }
})

stripeRouter.get('/checkout/complete', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

stripeRouter.get('/billing-portal/:customerId', async (req, res) => {
    try {
        const session = await stripe.billingPortal.sessions.create({
            customer: req.params.customerId,
            return_url: 'http://localhost:3000/account-settings/membership',
        });
        res.json({ url: session.url });
        console.log('The billing url is: ', session.url);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export default stripeRouter;