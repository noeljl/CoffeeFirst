import CoffeeCard from './CoffeeCard'
import './CoffeeGallery.css'
import coffeeShops from './CoffeeShops'

function CoffeeGallery() {
  return (
    <div className="coffee-gallery">
      {coffeeShops.map((coffeeShop) => (
        <CoffeeCard
          key={coffeeShop.id}
          imgSrc={coffeeShop.img}
          title={coffeeShop.title}
          rate={coffeeShop.rate}
          address={coffeeShop.address}
        />
      ))}
    </div>
  )
}

export default CoffeeGallery
