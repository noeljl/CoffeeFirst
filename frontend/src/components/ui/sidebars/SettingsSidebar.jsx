import { settingsMenu } from "./MenuData";
import Sidebar from "./Sidebar";

function SettingsSidebar() {
  return (<div>
    <h2>Account settings</h2>
    <Sidebar menu={settingsMenu} />
  </div>
  )
}

export default SettingsSidebar;