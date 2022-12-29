import { useState } from "react";
import RandomChar from "./../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import vision from "../../resources/img/vision.png";

function MainPage() {
  const [selectedChar, setSelectedChar] = useState(null);

  function onCharSelected(id) {
    setSelectedChar(id);
  }
  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharInfo charId={selectedChar} />
        </ErrorBoundary>{" "}
        <img className="bg-decoration" src={vision} alt="vision"></img>
      </div>
    </>
  );
}

export default MainPage;

