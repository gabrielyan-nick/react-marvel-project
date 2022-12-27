import { useEffect, useState } from "react";
import Header from "../header/header";
import RandomChar from "./../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import vision from "../../resources/img/vision.png";

function App() {
  const [selectedChar, setSelectedChar] = useState(null);

  function onCharSelected(id) {
    setSelectedChar(id);
  }

  return (
    <div className="app">
      <Header />
      <main>
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>

          <img className="bg-decoration" src={vision} alt="vision"></img>
        </div>
      </main>
    </div>
  );
}

export default App;
