// src/components/layout/TwoColumnLayout.jsx
import React from "react";
import Footer from "../footer/Footer";
import "./TwoColumnLayout.css";
import NavBar from "../navbar/Navbar";

// This component provides a two-column layout with a sidebar and main content area. It's just a shell that can be used to design the two column dashboard and settings pages.

function TwoColumnLayout({ SidebarSlot, children }) {
  return (
    <>
      <NavBar />

      <div className="two-column-layout">
        <aside className="sidebar-column">
          <SidebarSlot />
        </aside>

        <main className="main-column">
          {children}
        </main>
      </div>

      <Footer />
    </>
  );
}

export default TwoColumnLayout;