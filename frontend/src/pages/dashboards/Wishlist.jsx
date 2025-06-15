import React from "react";
import NavBar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardContent from "../../components/dashboard-content/DashboardContent";
import "./Dashboard.css";

function Wishlist() {

    
    return (
        
        <div>
            <NavBar />
          <div className="container">
                 <Sidebar />
                 <DashboardContent />
            </div>
            <Footer />
        </div>
    );
}

export default Wishlist;