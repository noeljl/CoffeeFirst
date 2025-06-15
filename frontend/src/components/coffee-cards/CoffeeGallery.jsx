import CoffeeCard from './CoffeeCard'
import './CoffeeGallery.css'
import coffeeShops from './CoffeeShops.json'

// Bild manuell importieren
import mvmCafeImg from '../../assets/mvm-cafe.png'

// Bildzuordnung (für spätere Erweiterung mit mehreren Bildern)
const imageMap = {
  'mvm-cafe.png': mvmCafeImg,
}

function CoffeeGallery() {
  return (
    <div className="coffee-gallery">
      {coffeeShops.map((coffeeShop) => (
        <CoffeeCard
          key={coffeeShop.id}
          imgSrc={imageMap[coffeeShop.img]}
          title={coffeeShop.title}
          rate={coffeeShop.rate}
          address={coffeeShop.address}
        />
      ))}
    </div>
  )
}

export default CoffeeGallery
