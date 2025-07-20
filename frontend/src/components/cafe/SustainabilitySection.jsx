import Icons from '../../assets/Icons';
import "./SustainabilitySection.css";
import '../../pages/styles/CafePage.css'

function SustainabilitySection({ list }) {
  return <section className='sustainabilitySection'>
    <h2 className='sectionName'>Sustainability commitment</h2>
    <div className="sustainabilityAspects">
      <div className="aspectGrid">
        {list.map((aspect, index) => (
          <div className="sustainabilityAspect" key={index}>
            <img src={Icons.tree} />
            <div className="aspectDetails">{aspect}</div>
          </div>
        ))}
      </div>
      <img id="fairtradeLogo" src={Icons.fairtradeLogo} alt="Fairtrade logo" />
    </div>
  </section>;
}

export default SustainabilitySection;