import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import { CSSTransition } from "react-transition-group";
import { useHttp } from "../../hooks/http.hook";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

function RandomChar() {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();
  const [showItem, setShowItem] = useState(false);

  useEffect(() => {
    updateChar();
    const timer = setInterval(updateChar, 60000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  function onCharLoaded(char) {
    setChar(char);
    setShowItem(true);
  }

  function updateChar() {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id).then(onCharLoaded);
  }

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading || !char) ? (
    <View char={char} showItem={showItem} />
  ) : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={updateChar} className="button button__main">
          <div className="inner" onClick={() => setShowItem(false)}>
            try it
          </div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
}

const View = (props) => {
  const { thumbnail, name, description, homepage, wiki } = props.char;
  const style = {
    objectFit: thumbnail.includes("image_not_available") ? "contain" : "cover",
  };

  return (
    <CSSTransition
      in={props.showItem}
      timeout={1000}
      classNames="randomchar__block"
      mountOnEnter
      unmountOnExit
    >
      <div className="randomchar__block">
        <img
          src={thumbnail}
          alt="Random character"
          className="randomchar__img"
          style={style}
        />
        <div className="randomchar__info">
          <p className="randomchar__name">{name}</p>
          <p className="randomchar__descr">{description}</p>
          <div className="randomchar__btns">
            <a href={homepage} className="button button__main" target="_blanc">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary" target="_blanc">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default RandomChar;
