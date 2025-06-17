import coffeesImage from "../../assets/dummyImages/coffees.jpg";
import customerImage from "../../assets/dummyImages/customer.jpg";
import coverImage from "../../assets/dummyImages/mvm-cafe.png";

const DummySingleCafeData = [
  {
    slug: "man-vs-machine",
    name: "Man versus Machine Coffee Roasters",
    address: "Hohenzollernstraße 32, 80801 München",
    coords: { lat: 48.1592, lng: 11.5865 },
    images: [coverImage, coffeesImage, customerImage],
    aboutCafe: "Man vs Machine is a specialty coffee roaster based in Munich, founded in 2014...",
    aboutCoffee: "At Man vs Machine, quality always comes before growth...",
    sustainability: ["smallBatch", "ethicalSourcing", "ecoPackaging", "arabicaOnly"],
    variants: ["espresso", "flatWhite", "coldBrew", "americano", "cappuccino"],
    offers: ["indoor", "outdoor", "freeWater", "freeCharging", "freeWifi", "petFriendly", "wheelchair"],
    ratings: {
      average: 4.8,
      total: 3,
      coffeeQuality: { taste: 4.2, presentation: 4.2, temperature: true },
      experience: { vibe: "Cozy", aesthetics: true, friendliness: 4.2, pricing: 4.2 },
      sustainability: { ecoPackaging: true, veganFriendly: true },
      tags: { socialMedia: true, goodForStudying: true, dateSpot: true }
    }
  }
];

export default DummySingleCafeData;