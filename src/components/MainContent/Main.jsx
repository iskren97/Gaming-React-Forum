import React from 'react';
import Categories from './Categories/Categories';
import Welcome from './Welcome/Welcome';
import Scroll from '../Scroll/Scroll';
import Footer from '../Footer/Footer';

import './Categories/Categories.css';
import DropDown from '../NewTopicModal/DropDown';

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
      <Scroll showBelow={250} />
      <Footer />
    </div>
  );
};

export default Main;
