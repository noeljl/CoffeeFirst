import SingleCafeCard from './SingleCafeCard'
import './CafeGallery.css'
import coffeeShops from './CafesData'

function CafeGallery() {
  return (
    <div className="coffee-gallery">
      {coffeeShops.map((coffeeShop) => (
        <SingleCafeCard
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

export default CafeGallery
