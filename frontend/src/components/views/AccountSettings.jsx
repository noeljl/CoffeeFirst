import { useParams } from 'react-router-dom'
import CafeGallery from '../cafes/CafeGallery'
// import VisitedCafeTable from "../visited/VisitedCafeTable"; // Add if needed
// import EmptyState from "../states/EmptyState"; // Optional fallback
import Membership from '../account-settings/Membership.jsx'
import Personal from '../account-settings/PersonalInfo.jsx'

function AccountSettings() {
  const { section } = useParams()

  const sectionMap = {
    personal: <Personal variant="personal" />,
    membership: <Membership variant="membership" />,
  }

  return sectionMap[section] || <div>Section not found</div>
}

export default AccountSettings
