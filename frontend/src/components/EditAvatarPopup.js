import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, buttonText}) {

  const [avatar, setAvatar] = React.useState('');
  const [avatarValid, setAvatarValid] = React.useState(true);
  const [textErrorAvatar, setTextErrorAvatar] = React.useState('');

  const handleChangeAvatar = event => {
    setAvatar(event.target.value);
    setAvatarValid(event.target.validity.valid);
    setTextErrorAvatar(event.target.validationMessage);
  }

  React.useEffect(() => {
    setAvatar('');
    setAvatarValid(false);
    setTextErrorAvatar('');
  }, [isOpen])

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateAvatar({avatar});
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onButton={avatarValid}
    >
      <input type="url"
             id="avatar-input"
             className="popup__text-input
                    popup__text-input_type_avatar"
             name="avatar"
             placeholder="Ссылка на аватар"
             onChange={handleChangeAvatar}
             value={avatar || ''}
             required
      />
      <span className={`popup__input-error ${textErrorAvatar && 'popup__input-error_visible'}`}>{textErrorAvatar || ''}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;