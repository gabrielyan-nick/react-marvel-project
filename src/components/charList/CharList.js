import React, { useEffect, useState, useRef } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";

function CharList(props) {
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest();
  }, []);

  function onError() {
    setError(true);
    setLoading(false);
  }

  function onCharListLoaded(newCharList) {
    let ended = false;
    if (newCharList.length < 12) {
      ended = true;
    }

    setCharList((charList) => [...charList, ...newCharList]);
    setOffset((offset) => offset + 12);
    setLoading(false);
    setNewItemsLoading(false);
    setCharEnded(ended);
  }

  function onCharListLoading() {
    setNewItemsLoading(true);
  }

  function onRequest(offset) {
    onCharListLoading();
    marvelService
      .getAllCharacters(12, offset)
      .then(onCharListLoaded)
      .catch(onError);
  }

  const itemRefs = useRef([]);

  function focusOnItem(id) {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  }

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let style = {
        objectFit: item.thumbnail.includes("image_not_available")
          ? "contain"
          : "cover",
      };

      return (
        <li
          className="char__item"
          tabIndex={0}
          key={item.id}
          onClick={() => {
            focusOnItem(i);
          }}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              props.onCharSelected(item.id);
              focusOnItem(i);
            }
          }}
          ref={el => itemRefs.current[i] = el}
        >
          <img src={item.thumbnail} alt={item.name} style={style} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  const items = renderItems(charList);
  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error) ? items : null;
  const style = { display: charEnded ? "none" : "block" };

  return (
    <div className="char__list">
      {spinner}
      {errorMessage}
      {content}
      <button
        className="button button__main button__long"
        disabled={newItemsLoading}
        style={style}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
}

export default CharList;

// onScrollLoad = () => {
//   let scrollHeight = Math.max(
//     document.body.scrollHeight,
//     document.documentElement.scrollHeight
//   );

//   let scrollTop =
//     window.pageYOffset ||
//     document.documentElement.scrollTop ||
//     document.body.scrollTop;

//   if (scrollTop + document.documentElement.clientHeight >= scrollHeight) {
//     this.onRequest(this.state.offset);
//   }
// };

// setActiveItem = (elem) => {
//   this.activeItem = elem;
// };
