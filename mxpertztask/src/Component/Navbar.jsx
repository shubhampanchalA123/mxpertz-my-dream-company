import React from 'react';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate= useNavigate()
  function homepage(){
   navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="logo">
        Brainylingo
      </div>
      <div className="nav-items">
        <button className="nav-button nav-home" onClick={homepage}>Home</button>
        <button className="nav-button">Leaderboard</button>
        <button className="nav-button">Daily Quiz</button>
        <button className="nav-button">Center</button>
      </div>
      <button className="signout-button">Sign Out</button>
    </nav>
  );
};

export default Navbar;
