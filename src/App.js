import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import MainPage from './Pages/MainPage';
import Maxit from './Maxit/Maxit';
import ErrorPage from './Pages/ErrorPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/maxit" element = {<MainPage />} />
          <Route path = "/maxit/game/:choice" element = {<Maxit />} />
          <Route path = "*" element = {<ErrorPage/ >} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
