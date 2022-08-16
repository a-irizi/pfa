import React from "react";
import { useSelector } from "react-redux";

const NewPaperConfirmation = ({
  generalPaper,
  revue,
  chapitre,
  communication,
  resetNewPaper,
  visibilityToggler,
  previousStep,
  onSubmit,
}) => {
  const { user, researchers } = useSelector((store) => store);
  const coauthors =
    generalPaper.coauthors.length > 0 ? (
      <ul>
        {researchers
          .filter((researcher) =>
            generalPaper.coauthors.includes(researcher.id)
          )
          .map((researcher) => (
            <li
              key={`${researcher.firstName}-${researcher.lastName}-${researcher.id}`}
            >{`${researcher.firstName} ${researcher.lastName}`}</li>
          ))}
      </ul>
    ) : null;
  return (
    <form onSubmit={onSubmit}>
      <div className="modal__input">
          <b>Titre</b> {generalPaper.title}
          <br />
          <b>coauthors</b> {coauthors}
          <br />
          <b>index</b> {generalPaper.index}
          <br />
          <b>type</b> {generalPaper.type}
          <br />
          <b>paperFile</b> {generalPaper.paperFile && generalPaper.paperFile.name}
          <br />
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
          <button
            type="submit"
            className="modal__button modal__button--confirm"
          >
            Confirmer
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
  );
};

export default NewPaperConfirmation;
