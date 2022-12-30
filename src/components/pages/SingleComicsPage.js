import { useState, useEffect } from "react";
import { useParams, Link} from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./singleComics.scss";

const SingleComicsPage = () => {
  const id = useParams().comicId;
  const { getComics, clearError, loading, error } = useMarvelService();
  const [comic, setComic] = useState(null);

  useEffect(() => {
    onRequest();
  }, [id]);

  function onRequest() {
    clearError();
    getComics(id).then((res) => setComic(res));
  }

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <div className="single-comic">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

function View({ comic }) {
  const style = {
    objectFit: `${
      comic.thumbnail.includes("image_not_available") ? "contain" : "cover"
    }`,
  };
  return (
    <>
      <img
        src={comic.thumbnail}
        alt={comic.title}
        className="single-comic__img"
        style={style}
      />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{comic.title}</h2>
        <p className="single-comic__descr">{comic.description}</p>
        <p className="single-comic__descr">{comic.pageCount}</p>
        <p className="single-comic__descr">{`Language: ${comic.language}`}</p>
        <div className="single-comic__price">{comic.price}</div>
      </div>
      <Link to={'/comics'} className="single-comic__back">
        Back to all
      </Link>
    </>
  );
}

export default SingleComicsPage;
