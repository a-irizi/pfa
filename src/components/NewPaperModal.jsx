import React from "react";
import { useState } from "react";

import "../styles/newPaperModel.css";

const NewPaperModal = (props) => {
  return (
    <>
      {props.isModalVisible && (
        <div className="overlay">
          <div className="modal">
            <div className="modal__content"> NewPaperModal</div>
            <button
              className="modal__close-button"
              onClick={props.visibilityToggler}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPaperModal;
