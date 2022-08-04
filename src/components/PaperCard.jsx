import React from "react";

import "../styles/paperCard.css";

import Link from "./Link";

const PaperCard = (props) => {
  const profileImage = (
    <div className="paper-card__owner__profile">
      <a href={props.authorPageLink}>
        <img
          src={props.profileImage}
          alt="profile"
          className="paper-card__owner__profile__image"
        />
      </a>
    </div>
  );

  const haveCoauthorsSection = props.coauthors && props.coauthors.length > 0;

  const coauthors =
    haveCoauthorsSection &&
    props.coauthors.map((coauthor) => (
      <div key={coauthor.pageLink} className="paper-card__coauthor">
        <a href={coauthor.pageLink}>
          <img src={coauthor.profile} alt="coauthor" />
        </a>
      </div>
    ));
  return (
    <div className="paper-card container container--gap">
      <div className="paper-card__owner container container--column container--center container--gap-m">
        {profileImage}
        <Link
          href="#"
          text={`${props.firstName} ${props.lastName}`}
          className="paper-card__owner__name"
        />
      </div>
      <div className="paper-card__details container container--column container--space-between container--top container--gap">
        <div className="container container--column container--gap-s container--top">
          <div
            className="container container--center"
            style={{ gap: "0.25rem" }}
          >
            <div className="paper-card__type">{props.type}</div>
            <div style={{ color: "#476681", fontSize: 10 }}>-</div>
            <div className="paper-card__upload-date">{props.releaseDate}</div>
          </div>
          <Link
            text={props.title}
            href={props.paperPageLink}
            className="paper-card__title"
          />
        </div>
        {haveCoauthorsSection && (
          <div className="paper-card__details__coauthors">
            <div className="paper-card__details__coauthors__title">
              coauteurs:
            </div>
            <div className="container container--gap">
              {coauthors}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaperCard;
