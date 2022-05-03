import './App.css';
import Header from './components/Header/Header';
import Main from './components/MainContent/Main';
import Footer from './components/Footer/Footer';
import CategoryView from './components/CategoryView/CategoryView';
import ProfilePage from './components/ProfilePage/ProfilePage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


import AboutPage from './views/AboutPage/AboutPage';
import ErrorPage from './views/ErrorPage/ErrorPage';

import { initializeApp } from 'firebase/app';
import { useState } from 'react';
import AppContext from './providers/AppContext'

const App = () => {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });


  return (
    <AppContext.Provider value={{...appState, setContext: setAppState}}>
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Main />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
    </AppContext.Provider>

    // <div>
    //   <Header />
    //   <Main />
    //   {/* <ErrorPage /> */}
    //   {/* <ProfilePage /> */}
    //   {/* <CategoryView /> */}
    // </div>
  );
};

export default App;
