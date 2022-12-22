// import CharItem from "./../charItem/CharItem";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  onCharListLoaded = (charList) => {
    this.setState({ charList, loading: false });
  };

  renderItems = (arr) => {
    const items = arr.map((item) => {
      let style = {
        objectFit: item.thumbnail.includes("image_not_available")
          ? "contain"
          : "cover",
      };
      return (
        <li className="char__item" key={item.id}>
          <img src={item.thumbnail} alt={item.name} style={style} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  };

  render() {
    const { charList, loading, error } = this.state;
    const items = this.renderItems(charList);
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {spinner}
        {errorMessage}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
