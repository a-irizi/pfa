import React from "react";

import linkLogo from "../images/link.svg";

const Link = (props) => {
  return (
    <a
      className={`link ${props.className ? props.className : ""}`}
      href={props.href}
    >
      {props.text}
      <span>
        <img src={linkLogo} alt="link" />
      </span>
    </a>
  );
};

export default Link;
