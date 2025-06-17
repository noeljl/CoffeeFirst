import { useParams } from "react-router-dom";
import CoffeeGallery from "../coffee-cards/CoffeeGallery";
// import VisitedCafeTable from "../visited/VisitedCafeTable"; // Add if needed
// import EmptyState from "../states/EmptyState"; // Optional fallback

function AccountSettings() {
  const { section } = useParams();

  const sectionMap = {
    personal: <CoffeeGallery variant="personal" />,
    membership: <CoffeeGallery variant="membership" />,
  };

  return sectionMap[section] || <div>Section not found</div>;
}

export default AccountSettings;