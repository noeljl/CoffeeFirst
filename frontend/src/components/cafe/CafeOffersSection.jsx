import Icons from '../../assets/Icons';
import "./SustainabilitySection.css";

function CoffeeOfferSection({ list }) {
  return <section className='sustainabilitySection'>
    <h2 className='sectionName'>Sustainability commitment</h2>
    <div className="sustainabilityAspects">
      <div className="aspectGrid">
        {list.map((aspect, index) => (
          <div className="sustainabilityAspect" key={index}>
            <img src={Icons.coffeeBean} />
            <div className="aspectDetails">{aspect}</div>
          </div>
        ))}
      </div>
    </div>
  </section>;
}

export default CoffeeOfferSection;