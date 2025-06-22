import { useParams } from "react-router-dom";
import CafeGallery from "../cafes/CafeGallery";
// import VisitedCafeTable from "../visited/VisitedCafeTable"; // Add if needed
// import EmptyState from "../states/EmptyState"; // Optional fallback

function AccountSettings() {
  const { section } = useParams();

  const sectionMap = {
    personal: <CafeGallery variant="personal" />,
    membership: <CafeGallery variant="membership" />,
  };

  return sectionMap[section] || <div>Section not found</div>;
}

export default AccountSettings;