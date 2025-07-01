import Button from "../ui/buttons/Button";
import Icons from "../../assets/Icons";
import "./CafeHeaderSection.css";

function CafeHeaderSection({ cafe }) {

  return (
    <section>
      <h1>{cafe.name}</h1>
      <div className="imageContainer">
        <img className="mainImage"
          src={cafe.images[0]}
          alt={cafe.name}
        />
        <div className="secondaryImages">
          <img className="secondaryImage upperImage" src={cafe.images[1]} alt="Gallery 1" />
          <img className="secondaryImage lowerImage" src={cafe.images[2]} alt="Gallery 2" />
        </div>
      </div>
      <div className="buttonContainer">
        <Button icon={Icons.heart} radius="small" fw="bold" fs="medium" bg="white" padding="medium">Add to Wishlist</Button>
        <Button icon={Icons.favorite} radius="small" fw="bold" bg="white" padding="medium">Add to Favorites</Button>
        <Button icon={Icons.map} radius="small" fw="bold" bg="white" padding="medium">Get direction</Button>
      </div>
    </section>
  );
}

export default CafeHeaderSection;