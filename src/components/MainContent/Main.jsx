import React from 'react';
import Categories from './Categories/Categories';
import Welcome from './Welcome/Welcome';
import './Categories/Categories.css';

const Main = () => {
  return (
    <div>
      <Welcome />
      <Categories />
    </div>
  );
};

export default Main;
