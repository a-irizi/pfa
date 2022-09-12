import React, { useEffect, useRef, useState } from "react";

import "../styles/researcherCard.css";

import { Link } from "react-router-dom";

import threeDots from "../images/threeDots.svg";
import statusRejectedLogo from "../images/status-rejected.png";
import statusPendingLogo from "../images/status-pending.png";
import { useDispatch } from "react-redux";
import { rejectResearcher, validateResearcher } from "../features/researchers/researchersSlice";

const ResearcherCard = ({ researcher }) => {
  const researcherBasePath =
    researcher.type === "professor" ? "/professeurs" : "/thesards";
  const researcherPath = `${researcherBasePath}/${researcher.id}`;
  const profileImage = (
    <div className="researcher-card__owner__profile">
      <Link to={researcherPath}>
        <img
          src={researcher.profile}
          alt="profile"
          className="researcher-card__profile__image"
        />
      </Link>
    </div>
  );

  const statusLogo =
    researcher.status !== "valid" ? (
      <img
        src={
          researcher.status === "rejected"
            ? statusRejectedLogo
            : statusPendingLogo
        }
        alt="status logo"
        className="status-logo"
      />
    ) : undefined;

  const [dropDownMenuVisible, setDropDownVisible] = useState(false);
  const dropDownMenuButtonRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const closeDropDownMenu = (e) => {
      if (e.composedPath()[0] !== dropDownMenuButtonRef.current) {
        setDropDownVisible(false);
      }
    };

    document.body.addEventListener("click", closeDropDownMenu);

    return () => {
      document.body.removeEventListener("click", closeDropDownMenu);
    };
  }, []);

  let actions;
  if (researcher.status === "pending") {
    actions = (
      <div className="dropDown__container">
        <button
          id={`researcher-${researcher.id}`}
          ref={dropDownMenuButtonRef}
          type="button"
          onClick={() => setDropDownVisible((old) => !old)}
          className="dropDown__triger"
        >
          <img
            src={threeDots}
            alt="three dots"
            style={{ pointerEvents: "none" }}
            className="dropDown__triger__icon"
          />
        </button>
        {dropDownMenuVisible && (
          <div className="dropDown__options">
            <button
              type="button"
              onClick={() => dispatch(validateResearcher(researcher.id))}
              className="dropDown__option"
            >
              <span style={{ color: "#2FB51A" }}>valider</span>
            </button>
            <button
              type="button"
              onClick={() => dispatch(rejectResearcher(researcher.id))}
              className="dropDown__option"
            >
              <span style={{ color: "#C01414" }}>rejeter</span>
            </button>
          </div>
        )}
      </div>
    );
  } else if (researcher.status === "valid") {
    actions = (
      <div className="dropDown__container">
        <button
          id={`researcher-${researcher.id}`}
          ref={dropDownMenuButtonRef}
          type="button"
          onClick={() => setDropDownVisible((old) => !old)}
          className="dropDown__triger"
        >
          <img
            src={threeDots}
            alt="three dots"
            style={{ pointerEvents: "none" }}
            className="dropDown__triger__icon"
          />
        </button>
        {dropDownMenuVisible && (
          <div className="dropDown__options">
            <button
              type="button"
              onClick={() => dispatch(rejectResearcher(researcher.id))}
              className="dropDown__option"
            >
              <span style={{ color: "#C01414" }}>rejeter</span>
            </button>
          </div>
        )}
      </div>
    );
  } else {
    actions = (
      <div className="dropDown__container">
        <button
          id={`researcher-${researcher.id}`}
          ref={dropDownMenuButtonRef}
          type="button"
          onClick={() => setDropDownVisible((old) => !old)}
          className="dropDown__triger"
        >
          <img
            src={threeDots}
            alt="three dots"
            style={{ pointerEvents: "none" }}
            className="dropDown__triger__icon"
          />
        </button>
        {dropDownMenuVisible && (
          <div className="dropDown__options">
            <button
              type="button"
              onClick={() => dispatch(validateResearcher(researcher.id))}
              className="dropDown__option"
            >
              <span style={{ color: "#2FB51A" }}>valider</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="researcher-card container container--gap">
      {statusLogo}
      {actions}
      <div className="researcher-card__profile container ">{profileImage}</div>
      <div className="researcher-card__details">
        <div className="container container--column container--gap-s container--top">
          <div>
            <Link
              to={researcherPath}
              className="researcher-card__name"
            >{`${researcher.firstName} ${researcher.lastName}`}</Link>
          </div>
          <div className="researcher-card__email">{researcher.email}</div>
          <div>
            <Link
              to={`/?userId=${researcher.id}`}
              className="researcher-card__papers"
            >
              Papiers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearcherCard;
