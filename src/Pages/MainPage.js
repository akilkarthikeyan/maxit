import React from "react";
import './MainPage.css';
import { useNavigate } from 'react-router-dom';
const MainPage = () => {
  let navigate = useNavigate();
    return (
      <div  className = "mainpage">
        <h1 className = "title" >MAXIT</h1>
        <button className = "btn  btn-warning menu-btn" onClick={() => {
          navigate(`/game/${1}`);
        }}>Single Player</button>
        <button className = "btn btn-warning menu-btn" onClick={() => {
          navigate(`/game/${2}`);
        }}>Multi Player</button>
      </div>
    );
  }
  export default MainPage;