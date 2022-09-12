import React from "react";

const NewPaperDetails = ({
  generalPaper,
  revue,
  chapitre,
  communication,
  workshop,
  changePaper,
  resetNewPaper,
  visibilityToggler,
  onSubmit,
}) => {
  function renderSwitch() {
    switch (generalPaper.type) {
      case "revue":
        return (
          <div
            style={{
              overflow: "auto",
              flex: "1",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "1rem",
            }}
          >
            <div style={{ gridColumn: "1/3" }}>
              <label htmlFor="magazineName-id">Nom du Journal</label>
              <input
                type="text"
                name="magazineName"
                id="magazineName-id"
                onChange={changePaper}
                value={revue.magazineName}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "1/2" }}>
              <label htmlFor="magazineNumber-id">Numero du journal</label>
              <input
                type="number"
                name="magazineNumber"
                id="magazineNumber-id"
                onChange={changePaper}
                value={revue.magazineNumber}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "2/3" }}>
              <label htmlFor="magazineVolume-id">Volume du journal</label>
              <input
                type="number"
                name="magazineVolume"
                id="magazineVolume-id"
                onChange={changePaper}
                value={revue.magazineVolume}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "1/2" }}>
              <label htmlFor="startPage-id">page de début</label>
              <input
                type="number"
                name="startPage"
                id="startPage-id"
                onChange={changePaper}
                value={revue.startPage}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "2/3" }}>
              <label htmlFor="endPage-id">page de fin</label>
              <input
                type="number"
                name="endPage"
                id="endPage-id"
                onChange={changePaper}
                value={revue.endPage}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "1/2" }}>
              <label htmlFor="publicationYear-id">Année de Publication</label>
              <input
                type="date"
                name="publicationYear"
                id="publicationYear-id"
                onChange={changePaper}
                value={revue.publicationYear}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        );
      case "chapitre":
        return (
          <div
            style={{
              overflow: "auto",
              flex: "1",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "1rem",
            }}
          >
            <div style={{ gridColumn: "1/3" }}>
              <label htmlFor="bookName-id">Nom d'Ouvrage</label>
              <input
                type="text"
                name="bookName"
                id="bookName-id"
                onChange={changePaper}
                value={chapitre.bookName}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "1/3" }}>
              <label htmlFor="chapterName-id">Nom du Chapitre</label>
              <input
                type="text"
                name="chapterName"
                id="chapterName-id"
                onChange={changePaper}
                value={chapitre.chapterName}
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ gridColumn: "1/2" }}>
              <label htmlFor="publicationYear-id">Année Publication</label>
              <input
                type="number"
                name="publicationYear"
                id="publicationYear-id"
                onChange={changePaper}
                value={chapitre.publicationYear}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "2/3" }}>
              <label htmlFor="bookEdition-id">Edition d'Ouvrage</label>
              <input
                type="number"
                name="bookEdition"
                id="bookEdition-id"
                onChange={changePaper}
                value={chapitre.bookEdition}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "1/2" }}>
              <label htmlFor="startPage-id">page de début</label>
              <input
                type="number"
                name="startPage"
                id="startPage-id"
                onChange={changePaper}
                value={chapitre.startPage}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "2/3" }}>
              <label htmlFor="endPage-id">page de fin</label>
              <input
                type="number"
                name="endPage"
                id="endPage-id"
                onChange={changePaper}
                value={chapitre.endPage}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        );
      case "communication":
        return (
          <div
            style={{
              overflow: "auto",
              flex: "1",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "1rem",
            }}
          >
            <div style={{ gridColumn: "1/3" }}>
              <label htmlFor="conferenceName-id">Nom du Conférence</label>
              <input
                type="text"
                name="conferenceName"
                id="conferenceName-id"
                onChange={changePaper}
                value={communication.conferenceName}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "1/3" }}>
              <label htmlFor="date-id">Date</label>
              <input
                type="date"
                name="date"
                id="date-id"
                onChange={changePaper}
                value={communication.date}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "1/2" }}>
              <label htmlFor="country-id">Pays</label>
              <input
                type="text"
                name="country"
                id="country-id"
                onChange={changePaper}
                value={communication.country}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "2/3" }}>
              <label htmlFor="city-id">Ville</label>
              <input
                type="text"
                name="city"
                id="city-id"
                onChange={changePaper}
                value={communication.city}
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ gridColumn: "1/2" }}>
              <label htmlFor="startPage-id">page de début</label>
              <input
                type="number"
                name="startPage"
                id="startPage-id"
                onChange={changePaper}
                value={communication.startPage}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "2/3" }}>
              <label htmlFor="endPage-id">page de fin</label>
              <input
                type="number"
                name="endPage"
                id="endPage-id"
                onChange={changePaper}
                value={communication.endPage}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        );

      case "workshop":
        return (
          <div
            style={{
              overflow: "auto",
              flex: "1",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "1rem",
            }}
          >
            <div style={{ gridColumn: "1/3" }}>
              <label htmlFor="conferenceName-id">Nom du Conférence</label>
              <input
                type="text"
                name="conferenceName"
                id="conferenceName-id"
                onChange={changePaper}
                value={workshop.conferenceName}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "1/3" }}>
              <label htmlFor="date-id">Date</label>
              <input
                type="date"
                name="date"
                id="date-id"
                onChange={changePaper}
                value={workshop.date}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "1/2" }}>
              <label htmlFor="country-id">Pays</label>
              <input
                type="text"
                name="country"
                id="country-id"
                onChange={changePaper}
                value={workshop.country}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "2/3" }}>
              <label htmlFor="city-id">Ville</label>
              <input
                type="text"
                name="city"
                id="city-id"
                onChange={changePaper}
                value={workshop.city}
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ gridColumn: "1/2" }}>
              <label htmlFor="startPage-id">page de début</label>
              <input
                type="number"
                name="startPage"
                id="startPage-id"
                onChange={changePaper}
                value={workshop.startPage}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ gridColumn: "2/3" }}>
              <label htmlFor="endPage-id">page de fin</label>
              <input
                type="number"
                name="endPage"
                id="endPage-id"
                onChange={changePaper}
                value={workshop.endPage}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        );

      default:
        return (
          <div
            style={{
              flex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "#4766817d",
                fontWeight: "600",
                fontSize: "1.25rem",
              }}
            >
              Selectioner le type
            </span>
          </div>
        );
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div
        className="modal__input"
        style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}
      >
        <div style={{ width: "30%" }}>
          <label htmlFor="title-id">titre</label>
          <input
            name="title"
            type="text"
            id="title-id"
            value={generalPaper.title}
            onChange={changePaper}
            style={{ width: "100%" }}
          />
          <label htmlFor="index-id">indexé par</label>
          <select
            name="index"
            id="index-id"
            onChange={changePaper}
            defaultValue={generalPaper.index}
            style={{ width: "100%" }}
          >
            <option value="" disabled hidden></option>
            <option value="scopus">scopus</option>
            <option value="web of science">web of science</option>
            <option value="other">autre</option>
          </select>
          <label htmlFor="type-id">type</label>
          <select
            name="type"
            id="type-id"
            onChange={changePaper}
            style={{ width: "100%" }}
          >
            <option
              value=""
              selected={generalPaper.type === ""}
              disabled
              hidden
            ></option>
            <option value="revue" selected={generalPaper.type === "revue"}>
              Revue
            </option>
            <option
              value="chapitre"
              selected={generalPaper.type === "chapitre"}
            >
              Chapitre
            </option>
            <option
              value="communication"
              selected={generalPaper.type === "communication"}
            >
              Communication
            </option>
            <option
              value="workshop"
              selected={generalPaper.type === "workshop"}
            >
              Workshop
            </option>
          </select>
        </div>
        {renderSwitch()}
      </div>
      <div className="modal__buttons">
        <div style={{ display: "flex", gap: ".5rem" }}>
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
  );
};

export default NewPaperDetails;
