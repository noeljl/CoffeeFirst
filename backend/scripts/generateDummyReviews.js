import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ReviewTopic, CoffeeType } from '../models/enums.js';

// Import models
import { Member } from '../models/member.js';
import CoffeeShopModel from '../models/coffeeShop.js';
import ReviewModel from '../models/review.js';

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://noellinder:w5WiwxRaVhD0TL4k@coffeefirst.vbrlytg.mongodb.net/coffeefirst?authMechanism=SCRAM-SHA-1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dummyComments = [
  "Great coffee and atmosphere!",
  "Loved the service.",
  "Perfect spot for studying.",
  "Amazing pastries and drinks.",
  "Will definitely come back!",
  "Nice place, but a bit crowded.",
  "Friendly staff and cozy vibe.",
  "Best espresso in town!",
  "Good for dates and friends.",
  "Loved the vegan options!"
];

async function generateDummyReviews() {
  try {
    // Get all members and all cafes
    const members = await Member.find().limit(10);
    const cafes = await CoffeeShopModel.findAll();

    if (members.length < 5) {
      throw new Error('Not enough members in the database to assign reviews.');
    }

    for (const cafe of cafes) {
      // Get existing reviews for this cafe
      const existingReviews = await ReviewModel.findByCoffeeShopId(cafe._id);
      const reviewsToCreate = 5 - existingReviews.length;

      if (reviewsToCreate > 0) {
        // Avoid duplicate reviews by the same member
        const usedMemberIds = new Set(existingReviews.map(r => r.member.toString()));
        let created = 0;

        for (const member of members) {
          if (created >= reviewsToCreate) break;
          if (usedMemberIds.has(member._id.toString())) continue;

          try {
            await ReviewModel.create({
              member: member._id,
              coffeeShop: cafe._id,
              rating: Math.floor(Math.random() * 5) + 1,
              comment: dummyComments[Math.floor(Math.random() * dummyComments.length)],
              subject: ReviewTopic.COFFEE_QUALITY,
              taste: Math.floor(Math.random() * 5) + 1,
              presentation: Math.floor(Math.random() * 5) + 1,
              temperature: Math.random() > 0.5,
              vibe: Math.random() > 0.5 ? "cozy" : "vibrant",
              aesthetics: Math.random() > 0.5,
              serviceFriendliness: Math.floor(Math.random() * 5) + 1,
              pricing: ["€", "€€", "€€€"][Math.floor(Math.random() * 3)],
              ecoFriendly: Math.random() > 0.5,
              veganFriendly: Math.random() > 0.5,
              instagram: Math.random() > 0.5,
              greatForStudying: Math.random() > 0.5,
              dateSpot: Math.random() > 0.5,
              petFriendly: Math.random() > 0.5,
            });
            created++;
          } catch (err) {
            if (
              err.message &&
              err.message.includes('already reviewed this coffee shop')
            ) {
              continue; // skip this member
            } else {
              throw err;
            }
          }
        }
        console.log(`Added ${created} dummy reviews to ${cafe.name}`);
      }
    }
    console.log('✅ Dummy reviews generated!');
  } catch (err) {
    console.error('❌ Error generating dummy reviews:', err);
  } finally {
    mongoose.connection.close();
  }
}

generateDummyReviews();
