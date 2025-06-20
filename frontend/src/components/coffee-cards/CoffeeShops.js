import mvmCafe from "../../assets/png/mvm-cafe.png"

const CoffeeShops = [
  {
    id: 1,
    title: "Bean Brothers",
    rate: 4.7,
    address: "Ludwigstraße 12, 80539 München",
    img: mvmCafe
  },
  {
    id: 2,
    title: "Café Blá",
    rate: 4.6,
    address: "Baaderstraße 34, 80469 München",
    img: mvmCafe
  },
  {
    id: 3,
    title: "Man Versus Machine",
    rate: 4.8,
    address: "Müllerstraße 23, 80469 München",
    img: mvmCafe
  },
  {
    id: 4,
    title: "Standl 20",
    rate: 4.5,
    address: "Elisabethmarkt, 80796 München",
    img: mvmCafe
  },
  {
    id: 5,
    title: "Vits der Kaffee",
    rate: 4.6,
    address: "Rumfordstraße 49, 80469 München",
    img: mvmCafe
  }
]

export const Districts = [
  "Maxvorstadt",
  "Schwabing",
  "Glockenbach",
  "Lehel",
  "Altstadt-Lehel",
  "Sendling",
  "Sendling-Westpark",
  "Au-Haidhausen",
  "Bogenhausen",
  "Ludwigsvorstadt-Isarvorstadt",
  "Neuhausen-Nymphenburg" 
]

// after your existing `export const Districts = […]` and `export default CoffeeShops;`

export const SEARCH_ITEMS = [
  // first all districts
  ...Districts.map(name => ({ type: 'district', name })),
  // then all cafés (using their title)
  ...CoffeeShops.map(shop => ({ type: 'cafe',     name: shop.title }))
];

export default CoffeeShops;

