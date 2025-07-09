import Button from "../ui/buttons/Button";
import Icons from "../../assets/Icons";
import "./CafeHeaderSection.css";
import { useEffect } from "react";
import { addCoffeeShopToMemberList } from "../../apis/member";
import { useSelector } from "react-redux";

function CafeHeaderSection({ cafe }) {
  // Use backend URL for images
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
  // Construct full image URLs
  const mainImageUrl = cafe.images?.[0] ? `${backendUrl}${cafe.images[0]}` : '';
  const secondaryImage1Url = cafe.images?.[1] ? `${backendUrl}${cafe.images[1]}` : '';
  const secondaryImage2Url = cafe.images?.[2] ? `${backendUrl}${cafe.images[2]}` : '';

  const member = useSelector(state => state.auth.member);
  const memberId = member?.member.id; // or member?._id if your backend uses _id

  // Handler for 'Add to Wishlist' button
  const handleAddToWishlist = async (memberId, cafeId, listType) => {
    try {
      await addCoffeeShopToMemberList(memberId, cafeId, listType);
      alert("Added to wishlist!");
    } catch (err) {
      // console.log('The member is:', member.member._id);  
      alert("Failed to add to wishlist.");
    }
  };

  // Handler for 'Add to Favorites' button
  const handleAddToFavorites = async (memberId, cafeId, listType) => {
    try {
      await addCoffeeShopToMemberList(memberId, cafeId, listType);
      alert("Added to favorites!");
    } catch (err) {
      alert("Failed to add to favorites.");
    }
  };

  // Handler for 'Get direction' bdutton
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
        <Button icon={Icons.heart} radius="small" fw="bold" fs="medium" bg="white" padding="medium" onClick={() => handleAddToWishlist(memberId, cafe._id, "wishlistCoffeeShops")}>Add to Wishlist</Button>
        <Button icon={Icons.favorite} radius="small" fw="bold" bg="white" padding="medium" onClick={() => handleAddToFavorites(memberId, cafe._id, "favoriteCoffeeShops")}>Add to Favorites</Button>
        <Button icon={Icons.map} radius="small" fw="bold" bg="white" padding="medium" onClick={handleGetDirection}>Get direction</Button>
      </div>
    </section>
  );
}

export default CafeHeaderSection;