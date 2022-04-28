import React from 'react';
import Categories from './Categories/Categories';
import Welcome from './Welcome/Welcome';
import './Categories/Categories.css';

const Main = () => {
  return (
    <div
      className="main-container"
      style={{ backgroundColor: 'rgb(248, 248, 248)' }}
    >
      <Welcome />
      <div className="category-container">
        <Categories />
      </div>
    </div>
  );
};

export default Main;
