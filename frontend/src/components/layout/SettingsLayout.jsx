import React from "react";
import TwoColumnLayout from "./TwoColumnLayout";
import SettingsSidebar from "../ui/sidebars/SettingsSidebar";
import { Outlet } from "react-router-dom";

function SettingsLayout() {
  return (
    <TwoColumnLayout SidebarSlot={SettingsSidebar}>
      <Outlet />
    </TwoColumnLayout>
  );
}

export default SettingsLayout;