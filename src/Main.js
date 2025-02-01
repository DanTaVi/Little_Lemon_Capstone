import React from 'react';
import './App.css';
import MainImage from './MainImage.png';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <main>
      <h1 className="LLHeader">Little Lemon</h1>
      <h2 className="CHeader">Chicago</h2>
      <div className="SubHeader">
        <p>
          We are a family-owned<br />
          Mediterranean restaurant,<br />
          focused on traditional<br />
          recipes served with a<br />
          modern twist.<br />
          <Link to="/Book">
            <button>Reserve a table</button>
          </Link>
        </p>
        <img src={MainImage} alt="Main" className="MainImage" />
      </div>
    </main>
  );
};

export default Main;
