import React from "react";
import Authorization from "./Authorization";
import {Link} from "react-router-dom";

function Register({onRegister}) {

  return (
    <Authorization
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={onRegister}
    >
      <span className="form-authorizations__inline-text">
        <p className="form-authorizations__text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="form-authorizations__link button-action">Войти</Link>
      </span>
    </Authorization>
  )
}

export default Register;