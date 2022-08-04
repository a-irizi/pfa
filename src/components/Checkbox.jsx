import React, { useState, useEffect } from "react";
import checkboxCheckedImage from "../images/checkbox-checked.svg";
import checkboxUncheckedImage from "../images/checkbox-unchecked.svg";

const Checkbox = (props) => {
  let checkmark = props.checked ? (
    <img src={checkboxCheckedImage} className="checkmark" />
  ) : (
    <img src={checkboxUncheckedImage} className="checkmark" />
  );

  return (
    <label htmlFor={props.id} className="checkbox">
      <input
        type="checkbox"
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        checked={props.checked}
      />
      <div className="checkmark">{checkmark}</div>
      {props.label}
    </label>
  );
};

export default Checkbox;
