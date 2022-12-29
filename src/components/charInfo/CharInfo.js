import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import "./charInfo.scss";

function CharInfo(props) {
  const [char, setChar] = useState(null);
  

  const {loading, error, getCharacter, clearError} = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  function onCharLoaded(char) {
    setChar(char);
  }

  function updateChar() {
    clearError();
    const { charId } = props;
    if (!charId) return;
    getCharacter(charId).then(onCharLoaded);
  }

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const style = {
    objectFit: thumbnail.includes("image_not_available") ? "contain" : "cover",
  };
  const comicsList =
    comics.length === 0 ? (
      <li className="char__comics-item">
        There are no comics with this character
      </li>
    ) : (
      // eslint-disable-next-line
      comics.map((item, i) => {
        if (i < 10) {
          return (
            <li className="char__comics-item" key={i}>
              {item.name}
            </li>
          );
        }
      })
    );

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={style} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main" target="_blanc">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary" target="_blanc">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">{comicsList}</ul>
    </>
  );
};

export default CharInfo;
