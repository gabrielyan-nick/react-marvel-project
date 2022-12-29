import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import Header from "../header/header";


function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Switch>
            <Route exact path={"/comics"}>
              <ComicsPage />
            </Route>

            <Route exact path={"/"}>
              <MainPage />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
