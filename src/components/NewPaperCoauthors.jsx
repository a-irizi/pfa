import React, { useState } from "react";
import { useSelector } from "react-redux";

const NewPaperCoauthors = ({
  generalPaper,
  changePaper,
  resetNewPaper,
  visibilityToggler,
  previousStep,
  onSubmit,
}) => {
  const userId = useSelector((store) => store.userId);
  const researchers = useSelector((store) => store.researchers);
  const [user] = researchers.filter((r) => r.id === userId);
  const previouslyWorkedWith = researchers
    .filter((researcher) => user.previouslyWorkedWith.includes(researcher.id))
    .filter((researcher) => !generalPaper.coauthorsId.includes(researcher.id));
  const neverWorkedWith = researchers
    .filter((researcher) => !user.previouslyWorkedWith.includes(researcher.id))
    .filter((researcher) => !generalPaper.coauthorsId.includes(researcher.id))
    .filter((researcher) => researcher.id !== user.id);

  function sortFunction(str1, str2) {
    const name1 = `${str1.firstName} ${str1.lastName}`;
    const name2 = `${str2.firstName} ${str2.lastName}`;

    if (name1 < name2) {
      return -1;
    }
    if (name1 > name2) {
      return 1;
    }
    return 0;
  }

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    gap: ".5rem",
    border: "none",
    borderRadius: ".25rem",
    backgroundColor: "rgba(236, 243, 249, 1)",
    padding: ".5rem .75rem",
    fontWeight: "500",
    cursor: "pointer",
    width: "100%",
  };
  const imageContainerStyle = {
    width: "2.3rem",
    hieght: "2.3rem",
    border: "none",
    borderRadius: "50%",
    overflow: "hidden",
  };
  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  };
  const previouslyWorkedWithChoices = [...previouslyWorkedWith]
    .sort(sortFunction)
    .map((researcher) => (
      <button
        onClick={() => changePaper(researcher.id)}
        key={researcher.id}
        style={{ ...buttonStyle, marginBottom: ".5rem" }}
      >
        <div style={imageContainerStyle}>
          <img style={imageStyle} src={researcher.profile} alt="" />
        </div>
        {`${researcher.firstName} ${researcher.lastName}`}
      </button>
    ));
  const neverWorkedWithChoices = [...neverWorkedWith]
    .sort(sortFunction)
    .map((researcher) => (
      <button
        onClick={() => changePaper(researcher.id)}
        key={researcher.id}
        style={{ ...buttonStyle, marginBottom: ".5rem" }}
      >
        <div style={imageContainerStyle}>
          <img style={imageStyle} src={researcher.profile} alt="" />
        </div>
        {`${researcher.firstName} ${researcher.lastName}`}
      </button>
    ));

  const selected = researchers.filter((researcher) =>
    generalPaper.coauthorsId.includes(researcher.id)
  );
  const selectedChoices = [...selected].sort(sortFunction).map((researcher) => (
    <button
      onClick={() => changePaper(researcher.id)}
      key={researcher.id}
      style={buttonStyle}
    >
      <div style={imageContainerStyle}>
        <img style={imageStyle} src={researcher.profile} alt="" />
      </div>
      {`${researcher.firstName} ${researcher.lastName}`}
    </button>
  ));

  const inputContainerStyle = {
    display: "grid",
    gridTemplateAreas: `"worked-with never-worked-with"
                        "selected selected"`,
    gap: "1rem",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "47.5% 47.5%",
    width: "100%",
    height: "100%",
  };

  const workedWithContainerStyle = {
    gridArea: "worked-with",
    display: "flex",
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, .25)",
    borderWidth: "2px",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: ".5rem",
  };

  const workedWithStyle = {
    width: "100%",
    overflowY: "auto",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  };

  const neverWorkedWithContainerStyle = {
    gridArea: "never-worked-with",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, .25)",
    borderWidth: "2px",
    borderRadius: ".5rem",
  };

  const neverWorkedWithStyle = {
    width: "100%",
    overflowY: "auto",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  };

  const selectedContainerStyle = {
    gridArea: "selected",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, .25)",
    borderWidth: "2px",
    borderRadius: ".5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  };
  const selectedContainer = {
    width: "100%",
    // overflow: "auto",
    display: "grid",
    gap: ".5rem",
    gridTemplateColumns: "25% 25% 25% 25%",
    gridTemplateRows: "auto auto",
    gridAutoFlow: " column",
    gridAutoColumns: "25%",
    gridAutoRows: "auto",
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="modal__input" style={inputContainerStyle}>
          <div style={workedWithContainerStyle}>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBlock: ".5rem",
                color: "rgba(28, 56, 84, 1)",
              }}
            >
              Déjà Travaillé Avec
            </div>
            <div style={workedWithStyle}>{previouslyWorkedWithChoices}</div>
          </div>
          <div style={neverWorkedWithContainerStyle}>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBlock: ".5rem",
                color: "rgba(28, 56, 84, 1)",
              }}
            >
              Jamais Travaillé Avec
            </div>
            <div style={neverWorkedWithStyle}>{neverWorkedWithChoices}</div>
          </div>
          <div style={selectedContainerStyle}>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBlock: ".5rem",
                color: "rgba(28, 56, 84, 1)",
              }}
            >
              coautheurs
            </div>
            <div style={selectedContainer}>{selectedChoices}</div>
          </div>
        </div>
        <div className="modal__buttons">
          <div style={{ display: "flex", gap: ".5rem" }}>
            <button
              type="submit"
              className="modal__button"
              onClick={previousStep}
            >
              precedent
            </button>
            <button type="submit" className="modal__button modal__button--next">
              suivant
            </button>
          </div>
          <button
            className="modal__button modal__button--close"
            onClick={(e) => {
              resetNewPaper();
              visibilityToggler(e);
            }}
          >
            annuler
          </button>
        </div>
      </form>
    </>
  );
};

export default NewPaperCoauthors;
