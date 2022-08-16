import React from "react";
import fileIcon from "../images/fileIcon.svg";

const NewPaperFileUploads = ({
  generalPaper,
  communication,
  workshop,
  changePaper,
  resetNewPaper,
  visibilityToggler,
  previousStep,
  onSubmit,
}) => {
  const firstFile = (
    <div
      style={{
        borderStyle: "dashed",
        borderWidth: "2px",
        borderColor: "rgba(128, 128, 128, .5)",
        borderRadius: ".5rem",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(236, 243, 249, 1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <input
        type="file"
        name="paperFile"
        onChange={changePaper}
        style={{
          position: "absolute",
          textAlign: "right",
          _moz_opacity: "0",
          filter: "alpha(opacity: 0)",
          opacity: "0",
          zIndex: "2",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        }}
        onClick={(e) => e.preventDefault()}
      />
      <div
        style={{
          textTransform: "capitalize",

          fontSize: "2rem",
          fontWeight: "700",
          color: "rgba(0, 137, 255, 1)",
          display: "block",
          pointer: "cursor",
          marginBottom: ".25rem",
        }}
      >
        fichier papier
      </div>
      <p
        style={{
          width: "80%",
          textAlign: "center",
          margin: "0",
          marginBottom: "4rem",
          color: "rgba(128, 128, 128, .7)",
        }}
      >
        Glissez le fichier ici ou clickez sur le boutton ci-dessous
      </p>
      <button
        type="button"
        style={{
          position: "relative",
          textTransform: "capitalize",
          fontSize: "1rem",
          fontWeight: "600",
          color: "white",
          display: "block",
          padding: ".7rem 1.2rem",
          cursor: "pointer",
          border: "none",
          borderRadius: ".25rem",
          backgroundColor: "rgba(0, 137, 255, 1)",
          boxShadow: "0 0 .4rem rgba(0, 0, 255, .5)",
        }}
      >
        Clicker ici
        <input
          type="file"
          name="paperFile"
          onChange={changePaper}
          style={{
            position: "absolute",
            textAlign: "right",
            _moz_opacity: "0",
            filter: "alpha(opacity: 0)",
            opacity: "0",
            zIndex: "2",
            cursor: "pointer",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
        />
      </button>
    </div>
  );
  let secondFile;
  if (generalPaper.type === "communication" || generalPaper.type === "workshop")
    secondFile = (
      <div
        style={{
          borderStyle: "dashed",
          borderWidth: "2px",
          borderColor: "rgba(128, 128, 128, .5)",
          borderRadius: ".5rem",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(236, 243, 249, 1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <input
          type="file"
          name={
            generalPaper.type === "communication"
              ? "cummunicationFile"
              : "workshopFile"
          }
          onChange={changePaper}
          style={{
            position: "absolute",
            textAlign: "right",
            _moz_opacity: "0",
            filter: "alpha(opacity: 0)",
            opacity: "0",
            zIndex: "2",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
        />
        <div
          style={{
            textTransform: "capitalize",

            fontSize: "2rem",
            fontWeight: "700",
            color: "rgba(0, 137, 255, 1)",
            display: "block",
            pointer: "cursor",
            marginBottom: ".25rem",
          }}
        >
          {`fichier ${
            generalPaper.type === "communication" ? "cummunication" : "workshop"
          }`}
        </div>
        <p
          style={{
            width: "80%",
            textAlign: "center",
            margin: "0",
            marginBottom: "4rem",
            color: "rgba(128, 128, 128, .7)",
          }}
        >
          Glissez le fichier ici ou clickez sur le boutton ci-dessous
        </p>
        <button
          type="button"
          style={{
            position: "relative",
            textTransform: "capitalize",
            fontSize: "1rem",
            fontWeight: "600",
            color: "white",
            display: "block",
            padding: ".7rem 1.2rem",
            cursor: "pointer",
            border: "none",
            borderRadius: ".25rem",
            backgroundColor: "rgba(0, 137, 255, 1)",
            boxShadow: "0 0 .4rem rgba(0, 0, 255, .5)",
          }}
        >
          Clicker ici
          <input
            type="file"
            name={
              generalPaper.type === "communication"
                ? "cummunicationFile"
                : "workshopFile"
            }
            onChange={changePaper}
            style={{
              position: "absolute",
              textAlign: "right",
              _moz_opacity: "0",
              filter: "alpha(opacity: 0)",
              opacity: "0",
              zIndex: "2",
              cursor: "pointer",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
          />
        </button>
      </div>
    );

  return (
    <form onSubmit={onSubmit}>
      <div
        className="modal__input"
        style={{ display: "flex", justifyContent: "center", gap: "2rem" }}
      >
        <div
          style={{
            width:
              generalPaper.type === "communication" ||
              generalPaper.type === "workshop"
                ? "45%"
                : "80%",
            height: "75%",
          }}
        >
          {firstFile}
          {generalPaper.paperFile != null && (
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
                fontSize: ".75rem",
              }}
            >
              <div>
                <img src={fileIcon} style={{ width: "2rem" }} alt="file icon" />{" "}
              </div>
              <div style={{ flex: "1" }}>{generalPaper.paperFile.name}</div>
            </div>
          )}
        </div>
        {(generalPaper.type === "communication" ||
          generalPaper.type === "workshop") && (
          <div
            style={{
              width: "45%",
              height: "75%",
            }}
          >
            {secondFile}
            {(communication.communicationFile != null ||
              workshop.workshopFile != null) && (
              <div
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: ".75rem",
                }}
              >
                <div>
                  <img
                    src={fileIcon}
                    style={{ width: "2rem" }}
                    alt="file icon"
                  />
                </div>
                <div style={{ flex: "1" }}>
                  {generalPaper.type === "communication"
                    ? communication.cummunicationFile.name
                    : workshop.workshopFile.name}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="modal__buttons">
        <div style={{ display: "flex", gap: ".5rem" }}>
          <button
            className="modal__button"
            onClick={previousStep}
          >
            precedent
          </button>
          <button type="submit" className="modal__button modal__button--confirm" >

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

export default NewPaperFileUploads;
