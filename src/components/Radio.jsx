import React, { useState, useEffect } from "react";
import radioActiveImage from "../images/radio-active.svg";
import radioPassiveImage from "../images/radio-passive.svg";

const Radio = (props) => {
  let radioButton = props.value === props.checkeString ? (
    <img src={radioActiveImage} />
  ) : (
    <img src={radioPassiveImage} />
  );

  return (
    <label htmlFor={props.id} className="radio">
      <input
        type="radio"
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        checked={props.value === props.checkeString}
      />
      <div className="radioButton">{radioButton}</div>
      {props.label}
    </label>
  );
};

export default Radio;
