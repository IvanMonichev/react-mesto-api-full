import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, buttonText}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [nameValid, setNameValid] = React.useState(true);
  const [descriptionValid, setDescriptionValid] = React.useState(true);
  const [textErrorName, setTextErrorName] = React.useState('');
  const [textErrorDescription, setTextErrorDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);


  const handleChangeName = event => {
    setName(event.target.value);
    setNameValid(event.target.validity.valid);
    setTextErrorName(event.target.validationMessage);
  }

  const handleChangeDescription = event => {
    setDescription(event.target.value);
    setDescriptionValid(event.target.validity.valid);
    setTextErrorDescription(event.target.validationMessage);
  }

  const handleSubmit = event => {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description
    })
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onButton={nameValid && descriptionValid}
    >
      <input type="text"
             id="name-input"
             className="popup__text-input popup__text-input_type_name"
             name="name"
             placeholder="Имя"
             required minLength="2"
             maxLength="40"
             onChange={handleChangeName}
             value={name || ''}
      />
      <span className={`popup__input-error ${textErrorName && 'popup__input-error_visible'}`}>{textErrorName}</span>
      <input type="text"
             id="about-input"
             className="popup__text-input
                       popup__text-input_type_about"
             name="about"
             placeholder="О себе"
             required minLength="2"
             maxLength="200"
             onChange={handleChangeDescription}
             value={description || ''}
      />
      <span
        className={`popup__input-error ${textErrorDescription && 'popup__input-error_visible'}`}>
        {textErrorDescription}
      </span>


    </PopupWithForm>
  )
}

export default EditProfilePopup;