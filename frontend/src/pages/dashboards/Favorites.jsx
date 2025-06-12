import React from "react";
import { NavbarSignedIn } from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardContent from "../../components/dashboard-content/DashboardContent";
import "./Dashboard.css"

function Favorites() {

    
    return (
        
        <div>
            <NavbarSignedIn />
            <div className="container">
                 <Sidebar />
                 <DashboardContent />
            </div>
            <Footer />
        </div>
    );
}

export default Favorites;