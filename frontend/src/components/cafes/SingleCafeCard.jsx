import "./SingleCafeCard.css";

function SingleCafeCard(props) {
  return (
    <div className="coffee-card">
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