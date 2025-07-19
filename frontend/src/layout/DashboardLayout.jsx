import React from "react";
import ColumnLayout from "./ColumnLayout";
import Sidebar from "../components/sidebars/Sidebar";
import { Outlet } from "react-router-dom";

/* 
This component provides a two-column layout with a sidebar and main content area for the dashboard. It gets passed the DashboardSidebar component as a prop to the 
TwoColumnLayout component, which is used to render the sidebar. The Outlet component is used to render the child routes of the dashboard layout.
*/

export default function DashboardLayout() {
    return (
        <ColumnLayout SidebarSlot={Sidebar} sidebarType="dashboard">
            <Outlet />
        </ColumnLayout>
    );
}