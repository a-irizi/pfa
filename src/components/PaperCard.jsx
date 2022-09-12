import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  deletePaper,
  validatePaper,
  rejectPaper,
} from "../features/papers/papersSlice";

import threeDots from "../images/threeDots.svg";
import statusRejectedLogo from "../images/status-rejected.png";
import statusPendingLogo from "../images/status-pending.png";

import "../styles/paperCard.css";

const PaperCard = ({ paper, confirmationFunction, updateFunction }) => {
  const userId = useSelector((store) => store.userId);
  const user = useSelector((store) =>
    store.researchers.find((r) => r.id === userId)
  );
  const author = useSelector((store) =>
    store.researchers.find((r) => r.id === paper.authorId)
  );

  const statusLogo =
    paper.status !== "valid" ? (
      <img
        src={
          paper.status === "rejected" ? statusRejectedLogo : statusPendingLogo
        }
        alt="status logo"
        className="status-logo"
      />
    ) : undefined;

  const dropDownMenuButtonRef = useRef();
  const [dropDownMenuVisible, setDropDownVisible] = useState(false);

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

  const coauthors = useSelector((store) =>
    store.researchers.filter((r) => paper.coauthorsId.includes(r.id))
  );
  const dispatch = useDispatch();

  let actions;
  if (author.id === userId) {
    actions = (
      <div className="dropDown__container">
        <button
          id={`button-${paper.id}-${author.id}`}
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
              onClick={() => updateFunction(paper.id)}
              className="dropDown__option"
            >
              modifier
            </button>
            <button
              type="button"
              onClick={() =>
                confirmationFunction(
                  `Supprimer papier "${paper.title}"`,
                  deletePaper,
                  paper.id
                )
              }
              className="dropDown__option"
            >
              <span style={{ color: "#C01414" }}>supprimer</span>
            </button>
          </div>
        )}
      </div>
    );
    // } else if (author.supervisorId === userId) {
  } else {
    if (paper.status === "pending") {
      actions = (
        <div className="dropDown__container">
          <button
            id={`button-${paper.id}-${author.id}`}
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
                onClick={() => dispatch(validatePaper(paper.id))}
                className="dropDown__option"
              >
                <span style={{ color: "#2FB51A" }}>valider</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  confirmationFunction(
                    `Rejeter papier "${paper.title}"`,
                    rejectPaper,
                    paper.id
                  )
                }
                className="dropDown__option"
              >
                <span style={{ color: "#C01414" }}>rejeter</span>
              </button>
            </div>
          )}
        </div>
      );
    } else if (paper.status === "valid") {
      actions = (
        <div className="dropDown__container">
          <button
            id={`button-${paper.id}-${author.id}`}
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
                onClick={() =>
                  confirmationFunction(
                    `Rejeter papier "${paper.title}"`,
                    rejectPaper,
                    paper.id
                  )
                }
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
            id={`button-${paper.id}-${author.id}`}
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
                onClick={() => dispatch(validatePaper(paper.id))}
                className="dropDown__option"
              >
                <span style={{ color: "#2FB51A" }}>valider</span>
              </button>
            </div>
          )}
        </div>
      );
    }
  }
  const researcherBasePath =
    author.type === "professor" ? "/professeurs" : "/thesards";
  const researcherPath = `${researcherBasePath}/${author.id}`;
  const profileImage = (
    <div className="paper-card__owner__profile">
      <Link to={researcherPath}>
        <img
          src={author.profile}
          alt="profile"
          className="paper-card__owner__profile__image"
        />
      </Link>
    </div>
  );

  const haveCoauthorsSection = coauthors.length > 0;

  const coauthorsSection =
    haveCoauthorsSection &&
    coauthors.map((coauthor) => (
      <div key={`coauthor-${coauthor.id}`} className="paper-card__coauthor">
        <Link
          to={`${
            coauthor.type === "professor" ? "/professeurs" : "/thesards"
          }/${coauthor.id}`}
        >
          <img src={coauthor.profile} alt="coauthor" />
        </Link>
      </div>
    ));
  return (
    <div className="paper-card container container--gap">
      {user.type === "student" && statusLogo}
      {actions}
      <div className="paper-card__owner container container--column container--center container--gap-m">
        {profileImage}
        <Link to={researcherPath} className="paper-card__owner__name">
          {`${author.firstName} ${author.lastName}`}
        </Link>
      </div>
      <div className="paper-card__details container container--column container--space-between container--top container--gap">
        <div className="container container--column container--gap-s container--top">
          <div
            className="container container--center"
            style={{ gap: "0.25rem" }}
          >
            <div className="paper-card__type">{paper.type}</div>
            <div style={{ color: "#476681", fontSize: 10 }}>-</div>
            <div className="paper-card__upload-date">{paper.releaseDate}</div>
          </div>
          <Link to="#" className="paper-card__title">
            {paper.title}
          </Link>
        </div>
        {haveCoauthorsSection && (
          <div className="paper-card__details__coauthors">
            <div className="paper-card__details__coauthors__title">
              coauteurs:
            </div>
            <div className="container container--gap">{coauthorsSection}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaperCard;
