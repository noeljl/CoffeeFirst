import { useNavigate } from "react-router-dom";
import "./SingleCafeCard.css";

function SingleCafeCard(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/partners/${props.slug}`);
  };

  return (
    <div className="coffee-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={props.imgSrc} alt={props.title} />
      <div className="text-block">
        <p className="shop-title">{props.title}</p>
        <p>{props.rate}</p>
        <p>{props.address}</p>
      </div>
    </div>
  )
}

export default SingleCafeCard;