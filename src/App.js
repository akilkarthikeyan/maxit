import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// import { useState } from 'react';

import MainPage from './Pages/MainPage';
import Maxit from './Maxit/Maxit';
import ErrorPage from './Pages/ErrorPage';

function App() {
  // const [version, setVersion] = useState(false);

  // const refresh = () => {
  //   console.log(version);
  //   setVersion(prevVersion => !prevVersion);
  // }

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
