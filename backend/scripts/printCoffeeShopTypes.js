// scripts/printCoffeeShopTypes.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CoffeeShop } from '../models/coffeeShop.js';

dotenv.config();

const printCoffeeShopTypes = async () => {
  try {
    const dbUri = process.env.MONGO_URI;
    if (!dbUri) throw new Error('MONGO_URI is not defined in your .env file');
    await mongoose.connect(dbUri);
    const shops = await CoffeeShop.find();
    console.log('Coffee Shops and their coffeeTypes:');
    shops.forEach(shop => {
      console.log(`- ${shop.name}:`, shop.coffeeTypes);
    });
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error printing coffee shop types:', err);
    process.exit(1);
  }
};

printCoffeeShopTypes();
