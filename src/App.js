import './App.css';
import Header from './components/Header/Header';
import Main from './components/MainContent/Main';
import Footer from './components/Footer/Footer';
import CategoryView from './components/CategoryView/CategoryView';
import ProfilePage from './components/ProfilePage/ProfilePage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AboutPage from './views/AboutPage/AboutPage';
import ErrorPage from './views/ErrorPage/ErrorPage';

import { useState } from 'react';
import AppContext from './providers/AppContext';

const App = () => {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
        <Header />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Main />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/category" element={<CategoryView />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>

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
