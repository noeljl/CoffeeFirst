import "./DashboardContent.css";
import CoffeeGallery from "../coffee-cards/CoffeeGallery"

function DashboardContent() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div><CoffeeGallery /></div>      
    </div>
  );
}

export default DashboardContent;