import Icons from "../../assets/Icons";
import Button from "../ui/buttons/Button";
import "./VisitStatusCardSection.css";

function VisitStatusCardSection({ lastVisit }) {
  return (
    <section className="statusContainer">
      <div className="visitInfo">
        <img src={Icons.coffeeShopColor} alt="Cafe Icon" className="cafeIcon" />
        <div className="textContainer">
          <h2 id="visitTitle">Last visit</h2>
          <p id="visitDate">Last visit on {lastVisit.date}.</p>
        </div>
      </div>
      <Button bg="white" fw="bold" fs="medium" icon={Icons.starGold2} radius="small" padding="medium">Your review</Button>
    </section>
  );
}

export default VisitStatusCardSection;