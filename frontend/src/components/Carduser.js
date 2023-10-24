import React from "react";

export default function Carduser(props) {
  return (
    <div
      className="menu-card"
      style={{ width: props.cardWidth, height: props.cardHeight }}
    >
      <img src={props.src} width={props.width} height={props.width}></img>
      <p>{props.description}</p>
      <p>{props.category}</p>
      <p>{props.price}</p>
    </div>
  );
}
