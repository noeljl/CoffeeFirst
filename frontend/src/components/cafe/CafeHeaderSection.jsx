import Button from "../ui/buttons/Button";
import Icons from "../../assets/Icons";
import "./CafeHeaderSection.css";

function CafeHeaderSection({ cafe }) {
  // Use backend URL for images
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
  
  // Construct full image URLs
  const mainImageUrl = cafe.images?.[0] ? `${backendUrl}${cafe.images[0]}` : '';
  const secondaryImage1Url = cafe.images?.[1] ? `${backendUrl}${cafe.images[1]}` : '';
  const secondaryImage2Url = cafe.images?.[2] ? `${backendUrl}${cafe.images[2]}` : '';

  // Handler for 'Get direction' button
  const handleGetDirection = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const destLat = cafe.coords.lat;
        const destLng = cafe.coords.lng;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destLat},${destLng}`;
        window.open(url, "_blank");
      },
      (error) => {
        alert("Could not get your location. Please allow location access.");
      }
    );
  };

  return (
    <section>
      <h1>{cafe.name}</h1>
      <div className="imageContainer">
        <img className="mainImage"
          src={mainImageUrl}
          alt={cafe.name}
        />
        <div className="secondaryImages">
          <img className="secondaryImage upperImage" src={secondaryImage1Url} alt="Gallery 1" />
          <img className="secondaryImage lowerImage" src={secondaryImage2Url} alt="Gallery 2" />
        </div>
      </div>
      <div className="buttonContainer">
        <Button icon={Icons.heart} radius="small" fw="bold" fs="medium" bg="white" padding="medium">Add to Wishlist</Button>
        <Button icon={Icons.favorite} radius="small" fw="bold" bg="white" padding="medium">Add to Favorites</Button>
        <Button icon={Icons.map} radius="small" fw="bold" bg="white" padding="medium" onClick={handleGetDirection}>Get direction</Button>
      </div>
    </section>
  );
}

export default CafeHeaderSection;