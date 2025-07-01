import dashboardMenu from "./MenuData";
import Sidebar from "./Sidebar";

function DashboardSidebar() {
  return (<div>
    <h2>Dashboard</h2>
    <Sidebar menu={dashboardMenu} />
  </div>
  )
}

export default DashboardSidebar;