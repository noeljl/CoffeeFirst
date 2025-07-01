import Icons from "../../assets/Icons";
import mvmCafe from "../../assets/png/mvm.cafe.png";

const CafeData = [
  {
    id: 1,
    name: "Man versus Machine Coffee Roasters",
    images: [
      mvmCafe, // main image
      mvmCafe, // barista
      mvmCafe, // coffee setup
    ],
    visit: {
      lastVisit: "2025-04-24",
    },
    aboutCafe:
      "Man vs Machine is a specialty coffee roaster based in Munich, founded in 2014. From the very beginning, they have remained fully independent—no investors, just a passionate team focused on excellence. Known for their uncompromising standards, they supply some of the finest cafés and bars across the UK, EU, and UAE. Their coffee is also featured in Michelin-starred restaurants and other quality-driven venues around the world.",
    aboutCoffee:
      "At Man vs Machine, quality always comes before growth. They roast only the highest grade Arabica beans (Specialty Grade >80pts) and maintain a strict no-Robusta policy. Each roast is crafted to bring out the full potential of every bean, ensuring a clean, rich, and distinctive flavor profile in every cup.",
    sustainabilityFacts: [
      { label: "Small-Batch Roasting", icon: Icons.tree },
      { label: "Ethical Sourcing", icon: Icons.tree },
      { label: "Eco-Friendly Packaging", icon: Icons.tree },
      { label: "100% Arabica Only", icon: Icons.tree },
      { label: "Fairtrade Certified", icon: Icons.tree },
    ],
    coffeeVariants: [
      { name: "Espresso", icon: Icons.coffeeBean },
      { name: "Americano", icon: Icons.coffeeBean },
      { name: "Flat White", icon: Icons.coffeeBean },
      { name: "Cold Brew", icon: Icons.coffeeBean },
      { name: "Cappuccino", icon: Icons.coffeeBean },
    ],
    cafeOffers: [
      { label: "Indoor Sitting", icon: Icons.couch },
      { label: "Outdoor Sitting", icon: Icons.sun },
      { label: "Free Water", icon: Icons.water },
      { label: "Free Wifi", icon: Icons.wifi },
      { label: "Free Charging", icon: Icons.charging },
      { label: "Wheelchair Friendly", icon: Icons.wheelchair },
      { label: "Pet Friendly", icon: Icons.pet },
    ],
    review: {
      rating: 4.8,
      count: 3,
      coffeeQuality: {
        taste: 4.2,
        presentation: 4.2,
        temperature: true,
      },
      cafeExperience: {
        vibe: "Cozy",
        aesthetics: true,
        serviceFriendliness: 4.2,
        pricing: 4.2,
      },
      sustainability: {
        ecoFriendlyPackaging: true,
        veganFriendly: true,
      },
      communityTags: {
        socialMedia: true,
        greatForStudying: true,
        dateSpot: true,
      },
    },
    location: {
      address: "Hohenzollernstraße 32, 80801 München",
      mapEmbedUrl:
        "https://www.google.com/maps/place/Hohenzollernstraße+32,+80801+München",
    },
  },
];

export default CafeData;