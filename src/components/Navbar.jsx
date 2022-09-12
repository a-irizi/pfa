import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "../styles/navbar.css";
import profileDropdownTriggerActive from "../images/profile_dropdown_active.svg";
import profileDropdownTriggerInactive from "../images/profile_dropdown_inactive.svg";

const Navbar = () => {
  const userId = useSelector((store) => store.userId);
  const user = useSelector((store) =>
    store.researchers.find((r) => r.id === userId)
  );
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);
  function toggleProfileDropdownVisibility(e) {
    setIsProfileDropdownVisible((prev) => !prev);
  }
  const profileDropDownRef = useRef();
  const profileDropDown = (
    <div className="nav__profile__dropdown">
      <div>
        <NavLink to="profile/mise-a-joure/" end>
          Modifier Profile
        </NavLink>
      </div>
      <div>
        <NavLink to="#" end>
          Déconnecter
        </NavLink>
      </div>
    </div>
  );
  useEffect(() => {
    const closeDropDownMenu = (e) => {
      if (e.composedPath()[0] !== profileDropDownRef.current) {
        setIsProfileDropdownVisible(false);
      }
    };

    document.body.addEventListener("click", closeDropDownMenu);

    return () => {
      document.body.removeEventListener("click", closeDropDownMenu);
    };
  }, []);

  return (
    <nav>
      <NavLink to="/" className="nav__title">
        papers
      </NavLink>
      <div className="nav__links">
        {/* <NavLink
          to=""
          className={(state) =>
            state.isActive ? "nav__link nav__link--active" : "nav__link"
          }
          end
        >
          statistiques
        </NavLink> */}
        <NavLink
          to="thesards"
          className={(state) =>
            state.isActive ? "nav__link nav__link--active" : "nav__link"
          }
        >
          thésards
        </NavLink>
        <NavLink
          to="professeurs"
          className={(state) =>
            state.isActive ? "nav__link nav__link--active" : "nav__link"
          }
        >
          professeurs
        </NavLink>
        <NavLink
          to=""
          className={(state) =>
            state.isActive ? "nav__link nav__link--active" : "nav__link"
          }
        >
          papiers
        </NavLink>
        <div className="nav__profile">
          <NavLink to="profile" className="nav__profile__link" end>
            <img
              src={user.profile}
              alt="user profile"
              className="nav__profile__image"
            />
          </NavLink>
          <button
            ref={profileDropDownRef}
            onClick={toggleProfileDropdownVisibility}
          >
            <img
              src={
                isProfileDropdownVisible
                  ? profileDropdownTriggerActive
                  : profileDropdownTriggerInactive
              }
              alt=""
            />
          </button>

          {isProfileDropdownVisible && profileDropDown}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
