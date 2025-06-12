import React from "react";
import "./PricingTableColumn.css";
import checkImg from "../../assets/check.svg";


function PricingTableColumn({
    name,
    color = "",
    price,
    advantages = ["Test1", "Test2"]
}) {
    const boxStyle = [
        "nameBox",
        `bg-${color}`
    ].join(" ");
    return (<div className="PricingTableColumnContainer">
        <div className={boxStyle}><p>{name}</p></div>
        <div className="priceBox"><p className="price">{price}</p><p>/month</p></div>
        <ul className="advantages-list">
            {advantages.map((val, key) => {
                return <li key={key}>
                    <div><img src={checkImg} className="list-icon"/></div>
                    <div>{val}</div>
                </li>
            })}
        </ul>
    </div>)
}

export default PricingTableColumn;