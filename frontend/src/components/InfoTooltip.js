import React from "react";
import successIcon from '../images/success-icon.svg';
import failIcon from '../images/fail-icon.svg'

function InfoTooltip ({isOpen, onClose, onSuccessRegister, textNotification}) {

  const handleOverlayClose = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    onClose();
  }

  return (
    <section onClick={handleOverlayClose} className={`popup ${isOpen && "popup_is-opened"}`}>
      <div className="popup__container popup__container_no-form">
        <img className="popup__icon"
             src={onSuccessRegister ? successIcon : failIcon}
             alt={onSuccessRegister ? "Успешная регистрация" : "Неудачная регистрация"}
        />
        <p className="popup__notification">
          {textNotification}
        </p>
        <button type="button" className="popup__close-button button-action" onClick={onClose}></button>
      </div>
    </section>
  )
}

export default InfoTooltip;