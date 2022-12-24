import React, { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    newItemsLoading: false,
    error: false,
    offset: 0,
    charEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
    // window.addEventListener("scroll", this.onScrollLoad);
  }

  // componentWillUnmount() {
  // window.removeEventListener("scroll", this.onScrollLoad);
  // }

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 12) {
      ended = true;
    }

    this.setState(({ charList, offset }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemsLoading: false,
      offset: offset + 12,
      charEnded: ended,
    }));
  };

  onCharListLoading = () => {
    this.setState({ newItemsLoading: true });
  };

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(12, offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

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

  itemRefs = [];

  setRef = (elem) => {
    this.itemRefs.push(elem);
  };

  focusOnItem = (id) => {
    this.itemRefs.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    this.itemRefs[id].classList.add("char__item_selected");
    this.itemRefs[id].focus();
  };

  renderItems = (arr) => {
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
            this.props.onCharSelected(item.id);
            this.focusOnItem(i);
          }}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              this.props.onCharSelected(item.id);
              this.focusOnItem(i);
            }
          }}
          ref={this.setRef}
        >
          <img src={item.thumbnail} alt={item.name} style={style} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  };

  render() {
    const { charList, loading, error, offset, newItemsLoading, charEnded } =
      this.state;
    const items = this.renderItems(charList);
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
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
