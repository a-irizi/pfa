import React from "react";

import "../styles/confirmActionModal.css";

const ConfirmActionModal = ({ action, cancelFunc, confirmFunc }) => {
  return (
    <div className="confirmation-overlay">
      <div className="confirmation-modal">
        <div className="confirmation-modal__message">
          <div className="confirmation-modal__title">Confirmer l'action</div>
          <div className="confirmation-modal__action">{action}</div>
        </div>
        <div className="confirmation-modal__buttons">
          <button
            className="confirmation-modal__button confirmation-modal__button--confirm"
            onClick={confirmFunc}
          >
            valide
          </button>
          <button className="confirmation-modal__button" onClick={cancelFunc}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionModal;
