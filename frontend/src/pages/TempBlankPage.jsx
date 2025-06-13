import React from "react";
import PricingTableColumn from "../components/pricing/PricingTableColumn";
import PricingTable from "../components/pricing/PricingTable";
import NavBar from "../components/navbar/Navbar";

function TempBlankPage() {
    return (
        <div>
            <NavBar />
            <PricingTableColumn />
            <PricingTable />
        </div>
    );
}

export default TempBlankPage;