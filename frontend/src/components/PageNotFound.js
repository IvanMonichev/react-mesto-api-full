import page from "../images/404-error.svg"
import React from "react";
import {Link} from "react-router-dom";

function PageNotFound() {
  const titleRef = React.useRef();
  const handleChangeText = () => {
    titleRef.current.textContent = "Но место всегда найдётся...";
  }

  return (
    <section className="not-found">
      <h1 className="not-found__title" onMouseMove={handleChangeText} ref={titleRef}>Страница не найдена</h1>
      <img className="not-found__image" src={page} alt="404 – страница не найдена"/>
      <Link className="not-found__button button-action" to="/">Вернуться на главную</Link>
    </section>

  );
}

export default PageNotFound;