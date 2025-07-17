import dashboardMenu from './MenuData'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'

function DashboardSidebar() {
  const member = useSelector((state) => state.auth.member)
  // Checkout nur anzeigen, wenn ShopOwner
  const filteredMenu = member?.isShopOwner
    ? dashboardMenu
    : dashboardMenu.filter((item) => item.title !== 'Checkout')
  return (
    <div>
      <h2>Dashboard</h2>
      <Sidebar menu={filteredMenu} />
    </div>
  )
}

export default DashboardSidebar
