import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import MainPage from './Pages/MainPage';
import Maxit from './Maxit/Maxit';
import ErrorPage from './Pages/ErrorPage';

function App() {
  return (
    <>
      <Router basename = '/maxit'>
        <Routes>
          <Route path = "/" element = {<MainPage />} />
          <Route path = "/game/:choice" element = {<Maxit />} />
          <Route path = "*" element = {<ErrorPage/ >} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
