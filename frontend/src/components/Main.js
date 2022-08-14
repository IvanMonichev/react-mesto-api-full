import React from "react";
import Card from './Card'
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({
                onEditAvatar,
                onEditProfile,
                onAddPlace,
                cards,
                onCardClick,
                onCardDelete,
                onCardLike,
              }
) {

  // Подписываемся на контекст «CurrentUserContext».
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile-avatar">
          {currentUser.avatar && <img src={currentUser.avatar}
                                      alt={`Аватар пользователя – ${currentUser.name}`}
                                      className="profile-avatar__image"/>
          }
          <button className="profile-avatar__edit-avatar" onClick={onEditAvatar}></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button button-action" onClick={onEditProfile}></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button button-action" onClick={onAddPlace}></button>
      </section>

      <section className="photo-gallery">
        <ul className="photo-gallery__list">

          {cards.map((card) => (
            <Card key={card._id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardDelete={onCardDelete}
                  onCardLike={onCardLike}
            />)
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;

