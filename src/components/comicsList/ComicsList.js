import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./comicsList.scss";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [comicsEnded, setComicsEnded] = useState(false);
  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  function onRequest(offset, init) {
    init ? setNewItemsLoading(false) : setNewItemsLoading(true);
    getAllComics(8, offset).then(onComicsListLoaded);
  }

  function onComicsListLoaded(newComicsList) {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }

    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setNewItemsLoading(false);
    setOffset((offset) => offset + 8);
    setComicsEnded(ended);
  }

  function renderItems(data) {
    const items = data.map((item, i) => {
      const style = {
        objectFit: item.thumbnail.includes("image_not_available")
          ? "contain"
          : "cover",
      };
      return (
        <li className="comics__item" key={item.id}>
          <a href={item.url} target="_blank">
            <img
              src={item.thumbnail}
              alt="ultimate war"
              className="comics__item-img"
              style={style}
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </a>
        </li>
      );
    });

    return <ul className="comics__grid">{items}</ul>;
  }

  const items = renderItems(comicsList);
  const spinner = loading && !newItemsLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const style = { display: comicsEnded ? "none" : "block" };

  return (
    <div className="comics__list">
      {items}
      {spinner}
      {errorMessage}
      <button
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
        style={style}
        disabled={newItemsLoading}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
