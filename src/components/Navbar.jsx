import React from "react";

import "../styles/navbar.css"

const Navbar = (props) => {
  return (
    <header>
      <nav className="nav">
        <a href="/" className="nav__title">
          papers
        </a>
        <ul className="nav__links">
          <li className="nav__link">
            <a href="#">statistiques</a>
            <div className="nav__link__indicator"></div>
          </li>
          <li className="nav__link">
            <a href="#">thésards</a>
            <div className="nav__link__indicator"></div>
          </li>
          <li className="nav__link">
            <a href="#">professeurs</a>
            <div className="nav__link__indicator"></div>
          </li>
          <li className="nav__link nav__link--active">
            <a href="#">papiers</a>
            <div className="nav__link__indicator"></div>
          </li>
          <li className="nav__link">
            <a href="#">profile</a>
            <div className="nav__link__indicator"></div>
          </li>
        </ul>
        <div className="nav__button-group">
          <button className="nav__button nav__button--outline">
            déconnecter
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
