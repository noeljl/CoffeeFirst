import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Import models
import MembersModel, { Member } from '../models/member.js';
import MembershipModel from '../models/membership.js';
import MemberCardModel from '../models/memberCard.js';

// Import enums
import { CoffeeType, MembershipTier, PaymentStatus } from '../models/enums.js';

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://noellinder:w5WiwxRaVhD0TL4k@coffeefirst.vbrlytg.mongodb.net/coffeefirst?authMechanism=SCRAM-SHA-1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dummyMembers = [
  { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com' },
  { firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com' },
  { firstName: 'Charlie', lastName: 'Brown', email: 'charlie@example.com' },
  { firstName: 'Diana', lastName: 'Miller', email: 'diana@example.com' },
  { firstName: 'Eve', lastName: 'Davis', email: 'eve@example.com' },
  { firstName: 'Frank', lastName: 'Wilson', email: 'frank@example.com' },
  { firstName: 'Grace', lastName: 'Moore', email: 'grace@example.com' },
  { firstName: 'Henry', lastName: 'Taylor', email: 'henry@example.com' },
  { firstName: 'Ivy', lastName: 'Anderson', email: 'ivy@example.com' },
  { firstName: 'Jack', lastName: 'Thomas', email: 'jack@example.com' },
];

async function generateDummyMembers() {
  try {
    const passwordHash = await bcrypt.hash('password123', 10);

    for (const member of dummyMembers) {
      // Avoid duplicate emails
      const
       exists = await Member.findOne({ email: member.email });
      if (exists) {
        console.log(`Member already exists: ${member.email}`);
        continue;
      }

      // Create a unique membershipType for each member (or reuse one if you want)
      // For simplicity, let's just use a random ObjectId for chosenMembership
      const chosenMembership = new mongoose.Types.ObjectId();

      // Create Membership
      const membership = await mongoose.model('Membership').create({
        member: uuidv4(),
        chosenMembership,
        startDate: new Date(),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year from now
        payDate: new Date(),
        coffeeQuotaLeft: 10,
      });

      // Create MemberCard
      const memberCard = await mongoose.model('MemberCard').create({
        name: `${member.firstName} ${member.lastName} Card`,
        coffeeType: CoffeeType.FLAT_WHITE,
        cardCode: uuidv4().slice(0, 12),
        membershipTier: MembershipTier.SILVER,
        membership: membership._id,
      });

      // Create Member
      await Member.create({
        ...member,
        passwordHash,
        id: uuidv4(),
        isShopOwner: false,
        subscribe: false,
        membership: membership._id,
        memberCard: memberCard._id,
        paymentStatus: PaymentStatus.PENDING,
      });

      console.log(`Created member: ${member.email}`);
    }
    console.log('✅ Dummy members generated!');
  } catch (err) {
    console.error('❌ Error generating dummy members:', err);
  } finally {
    mongoose.connection.close();
  }
}

generateDummyMembers();
