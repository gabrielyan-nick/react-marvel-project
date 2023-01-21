import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../spinner/Spinner";
import Header from "../header/Header";


const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicsPage = lazy(() => import("../pages/SingleComicsPage"));

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Suspense fallback={<Spinner/>}>
            <Routes>
              <Route path={"/"} element={<MainPage />} />
              <Route path={"/comics"} element={<ComicsPage />} />
              <Route path={"/comics/:comicId"} element={<SingleComicsPage />} />
              <Route path={"*"} element={<ErrorPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
