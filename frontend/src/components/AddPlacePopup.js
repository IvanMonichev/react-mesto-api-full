import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({isOpen, onClose, onAddCard, buttonText}) {


  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const [nameValid, setNameValid] = React.useState(true);
  const [linkValid, setLinkValid] = React.useState(true);
  const [textErrorName, setTextErrorName] = React.useState('');
  const [textErrorLink, setTextErrorLink] = React.useState('');

  const handleChangeName = event => {
    setName(event.target.value);
    setNameValid(event.target.validity.valid);
    setTextErrorName(event.target.validationMessage);
  }

  const handleChangeLink = event => {
    setLink(event.target.value);
    setLinkValid(event.target.validity.valid);
    setTextErrorLink(event.target.validationMessage);
  }

  const handleAddPlaceSubmit = event => {
    event.preventDefault();
    onAddCard({name, link});
  }

  React.useEffect(() => {
    setName('');
    setLink('');
    setNameValid(false);
    setLinkValid(false);
    setTextErrorName('');
    setTextErrorLink('');
  }, [isOpen])

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
      onButton={nameValid && linkValid}
    >
      <input type="text"
             id="title-input"
             className="popup__text-input popup__text-input_type_title"
             name="name"
             placeholder="Название"
             required minLength="2" maxLength="30"
             onChange={handleChangeName}
             value={name || ''}
      />
      <span className={`popup__input-error ${textErrorName && 'popup__input-error_visible'}`}>{textErrorName}</span>
      <input type="url"
             id="link-input"
             className="popup__text-input popup__text-input_type_link"
             name="link"
             placeholder="Ссылка на картинку"
             onChange={handleChangeLink}
             value={link || ''}
             required/>
      <span className={`popup__input-error ${textErrorLink && 'popup__input-error_visible'}`}>{textErrorLink}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;