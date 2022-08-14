import React from "react";
import Authorization from "./Authorization";

function Login({onLogin}) {
  return (
    <Authorization
      title="Вход"
      buttonText="Войти"
      onSubmit={onLogin}
    >
    </Authorization>
  )
}

export default Login;