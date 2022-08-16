import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/Api";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import {authorize, getContent, register } from "../utils/Auth";
import PageNotFound from "./PageNotFound";

function App() {
  // Хуки
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [isLoading, setIsLoading] = React.useState(false);
  const [card, setCard] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [successRegister, setSuccessResister] = React.useState(false);
  const [textNotification, setTextNotification] = React.useState('');
  const history = useHistory();



  React.useEffect(() => {
    const jwt = localStorage.getItem('access_token');

    if (jwt) {
      console.log(jwt);
      getContent(jwt)
        .then((res) => {
          setEmail(res.email);

          setLoggedIn(true);
          history.push('/');
        })
        .catch(error => {
          if (error === 400) {
            console.log('400 - токен не передан или передан не в том формате');
          } else if (error === 401) {
            console.log('401 - переданный токен некорректен');
          } else {
            console.log(`${error.status} – ${error.statusText}`);
          }
        })
    }
  }, [history]);

  React.useEffect(() => {
    if (loggedIn) {
      api.getAllData()
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

  const handleUpdateUser = ({name, about}) => {
    setIsLoading(true);
    api.setUserInfo({name, about})
      .then(() => {
        setCurrentUser({...currentUser, name, about});
        setEditProfilePopupOpen(false);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));

  };

  const handleUpdateAvatar = ({avatar}) => {
    setIsLoading(true);
    api.editAvatar({avatar})
      .then(() => {
        setCurrentUser({...currentUser, avatar});
        setEditAvatarPopupOpen(false);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const handleAddCard = ({name, link}) => {
    setIsLoading(true);
    api.addCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setAddPlacePopupOpen(false);
        setIsLoading(false)});
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard({name: '', link: ''})
  }

  function handleDeleteCardPopupClick(card) {
    setDeleteCardPopupOpen(!isDeleteCardPopupOpen);
    setCard(card);
  }

  // Удаление карточки
  function handleDeleteCard() {
    setIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        // Устанавливаем в стейт новый массив без удалённой карточки.
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch(err => console.log(err))
      .finally(() => {
        setDeleteCardPopupOpen(false);
        setIsLoading(false)
      });

  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(cards => cards.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  const isSuccessRegister = (boolean) => {
    setSuccessResister(boolean);
    if (boolean) {
      setTextNotification('Вы успешно зарегистрировались!');
    } else  {
      setTextNotification('Что-то пошло не так! Попробуйте ещё раз.');
    }
    setInfoTooltipPopupOpen(true);
  }

  /* Регистрация, авторизация */
  const handleRegisterSubmit = ({email, password}) => {
    register(email, password)
      .then(() => {
        isSuccessRegister(true);
        history.push('/sign-in');
      })
      .catch(error => {
        console.log(error)
        isSuccessRegister(false);
      })
  }

  const handleLoginSubmit = ({email, password}) => {
    authorize(email, password)
      .then((data) => {
        if (data) {
          setEmail(email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch(error => {
        isSuccessRegister(false);
        if (error === 400) {
          console.log('400 - не передано одно из полей ');
        } else if (error === 401) {
          console.log('401 - пользователь email не найден');
        } else {
          console.log(`${error.status} – ${error.statusText}`);
        }
      })
  }

  const handleExit = () => {
    localStorage.removeItem('access_token');
    setLoggedIn(false);
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        onExit={handleExit}
        email={email}
      />
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          component={Main}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardDelete={handleDeleteCardPopupClick}
          onCardLike={handleCardLike}
        />
        <Route path="/sign-in">
          <Login
            onLogin={handleLoginSubmit}
          />
        </Route>
        <Route path="/sign-up">
          <Register
            onRegister={handleRegisterSubmit}
          />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
        <Route>
          {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
        </Route>
      </Switch>
      <Route exact path="/">
        <Footer/>
      </Route>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddCard={handleAddCard}
        buttonText={isLoading ? "Создание..." : "Создать"}
      />

      <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        buttonText={isLoading ? "Удаление..." : "Удалить"}
        onDeleteCard={handleDeleteCard}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        onSuccessRegister={successRegister}
        textNotification={textNotification}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
