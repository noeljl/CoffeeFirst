import coffeesImage from "../../assets/dummyImages/coffees.jpg";
import customerImage from "../../assets/dummyImages/customer.jpg";
import coverImage from "../../assets/dummyImages/mvm-cafe.png";

const DummySingleCafeData = [
  {
    slug: "man-vs-machine",
    name: "Man versus Machine Coffee Roasters",
    address: "Hohenzollernstraße 32, 80801 München",
    coords: { lat: 48.15997773264443, lng: 11.581492083804415 },
    lastVisit: "April 24, 2025",
    images: [coverImage, coffeesImage, customerImage],
    aboutCafe: "Man vs Machine is a specialty coffee roaster based in Munich, founded in 2014...",
    aboutCoffee: "At Man vs Machine, quality always comes before growth...",
    sustainability: ["smallBatch", "ethicalSourcing", "ecoPackaging", "arabicaOnly"],
    variants: ["espresso", "flatWhite", "coldBrew", "americano", "cappuccino"],
    offers: ["indoor", "outdoor", "freeWater", "freeCharging", "freeWifi", "petFriendly", "wheelchair"],
    ratings: {
      average: 4.8,
      total: 3,
      coffeeQuality: { taste: 4.2, presentation: 4.2, temperature: "good" },
      experience: { vibe: "Cozy", aesthetics: "yes", friendliness: 4.2, pricing: 4.2 },
      sustainability: { ecoPackaging: "yes", veganFriendly: "yes" },
      tags: { socialMedia: "yes", goodForStudying: "yes", dateSpot: "yes" }
    }
  }
];

export default DummySingleCafeData;