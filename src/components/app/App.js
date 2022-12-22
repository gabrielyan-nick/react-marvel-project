import Header from "../header/header";
import RandomChar from "./../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import vision from "../../resources/img/vision.png";

const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList />
          <CharInfo />
          <img className="bg-decoration" src={vision} alt="vision"></img>
        </div>
      </main>
    </div>
  );
};

export default App;
