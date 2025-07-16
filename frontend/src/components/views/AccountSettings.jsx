import { useParams } from 'react-router-dom'
import Membership from '../account-settings/Membership.jsx'
import Personal from '../account-settings/PersonalInfo.jsx'

// AccountSettings component
// Renders the account settings with the current section (personal, membership)
// Props:
// - None
// Returns:
// - The current section
// - A message if the section is not found
export default function AccountSettings() {
  const { section } = useParams()

  const sectionMap = {
    personal: <Personal variant="personal" />,
    membership: <Membership variant="membership" />,
  }

  return sectionMap[section] || <div>Section not found</div>
}