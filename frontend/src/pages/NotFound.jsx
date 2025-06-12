import React from "react";
import NavbarSignedOut from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function NotFound() {
    return (
        
        <div>
            <NavbarSignedOut />
            <h1>404 - page not found</h1>
            <Footer />
        </div>
    );
}

export default NotFound;