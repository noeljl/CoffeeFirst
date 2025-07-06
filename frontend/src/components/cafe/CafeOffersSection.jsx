import { AMENITY_ICONS } from './amenityIcons';
import "./SustainabilitySection.css";

function CafeOffersSection({ list }) {
  return <section className='sustainabilitySection'>
    <h2 className='sectionName'>What this café offers</h2>
    <div className="sustainabilityAspects">
      <div className="aspectGrid">
        {list.map((aspect, index) => (
          <div className="sustainabilityAspect" key={index}>
            
            <img id="icon"src={AMENITY_ICONS[aspect]} alt={aspect} />
            <div className="aspectDetails">{aspect.replace(/_/g, ' ')}</div>
          </div>
        ))}
      </div>
    </div>
  </section>;
}

export default CafeOffersSection;