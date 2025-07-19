import React from "react";
import ColumnLayout from "./ColumnLayout";
import Sidebar from "../components/sidebars/Sidebar";
import { Outlet } from "react-router-dom";

export default function SettingsLayout() {
  return (
    <ColumnLayout SidebarSlot={Sidebar} sidebarType="settings">
      <Outlet />
    </ColumnLayout>
  );
}