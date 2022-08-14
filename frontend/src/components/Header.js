import logo from "../images/logo.svg";
import React from "react";
import {Switch, Route, Link} from "react-router-dom";

function Header({onExit, email}) {

  const burgerRef = React.useRef();
  const burgerLineRef = React.useRef();
  const headerMenuRef = React.useRef();

  const handleToggleActiveNav = () => {
    burgerRef.current.classList.toggle('header__burger_is-active');
    burgerLineRef.current.classList.toggle('header__burger-line_is-active');
    headerMenuRef.current.classList.toggle('header-nav_is-active');
  }


  return (
    <header className="header">
      <div className="header__body">
        <img src={logo} alt="Логотип Mesto Russia" className="header__logo"/>

        <Switch>
          <Route path="/sign-in">
            <nav className="header__menu header-nav">
              <ul className="header-nav__list">
                <li className="header-nav__item">
                  <Link to="/sign-up" className="header-nav__link link-fade button-action">Регистрация</Link>
                </li>
              </ul>
            </nav>
          </Route>
          <Route path="/sign-up">
            <nav className="header__menu header-nav">
              <ul className="header-nav__list">
                <li className="header-nav__item">
                  <Link to="/sign-in" className="header-nav__link link-fade button-action">Войти</Link>
                </li>
              </ul>
            </nav>
          </Route>
        </Switch>
        <Route exact path="/">
          <button ref={burgerRef} type="button" className="header__burger" onClick={handleToggleActiveNav}>
            <span ref={burgerLineRef} className="header__burger-line"/>
          </button>
        </Route>
      </div>
      <Route exact path="/">
        <nav ref={headerMenuRef} className="header__menu header-nav header-nav_atop">
          <ul className="header-nav__list">
            <li className="header-nav__item">{email}</li>
            <li className="header-nav__item">
              <Link to="/sign-in" className="header-nav__link link-fade button-action" onClick={onExit}>Выйти</Link>
            </li>
          </ul>
        </nav>
      </Route>
    </header>
  )
    ;
}

export default Header;