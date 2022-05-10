import './App.css';
import Header from './components/Header/Header';
import Main from './components/MainContent/Main';
import CategoryView from './components/CategoryView/CategoryView';
import ProfilePage from './components/ProfilePage/ProfilePage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AboutPage from './views/AboutPage/AboutPage';
import ErrorPage from './views/ErrorPage/ErrorPage';

import { useState, useEffect } from 'react';
import AppContext from './providers/AppContext';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config';
import { getUserData } from './services/users.service';
import ScrollToTop from './components/Scroll/ScrollToTop';
import UsersView from './views/UsersView/Users';
import Posts from './views/AllPosts/Posts';

import shooters from './assets/shooters.jpg';
import general from './assets/gamesBackground.jpg';
import mmo from './assets/mmorpg.jpg';
import rts from './assets/strategy.jpg';
import adv from './assets/adventure.jpg';
import pc from './assets/pc.jpg';
import accs from './assets/accs.jpg';
import vs from './assets/vs.jpg';
import stream from './assets/stream.jpg';
import ent from './assets/ent.jpg';

const App = () => {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  let [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user === null) return;

    getUserData(user.uid)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error('Something went wrong!');
        }

        setAppState({
          user,
          userData: snapshot.val()[Object.keys(snapshot.val())[0]],
        });
      })
      .catch((e) => alert(e.message));
  }, [user]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
        <Header loading={loading} />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Main />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/users" element={<UsersView />} />
          <Route
            path="/profile/:username"
            element={<ProfilePage key={window.location.pathname} />}
          />
          <Route path="/all_posts" element={<Posts />} />

          <Route
            path="/general_discussion"
            element={
              <CategoryView topic={'General Discussion'} img={general} />
            }
          />
          <Route
            path="/shooters"
            element={<CategoryView topic={'Shooters'} img={shooters} />}
          />
          <Route
            path="/mmorpg"
            element={<CategoryView topic={'MMORPG'} img={mmo} />}
          />
          <Route
            path="/rts"
            element={<CategoryView topic={'Real Time Strategy'} img={rts} />}
          />

          <Route
            path="/adventure"
            element={<CategoryView topic={'Adventure'} img={adv} />}
          />
          <Route
            path="/gaming_pc"
            element={<CategoryView topic={'Gaming Laptops and PCs'} img={pc} />}
          />
          <Route
            path="/gaming_accessories"
            element={<CategoryView topic={'Gaming Accessories'} img={accs} />}
          />
          <Route
            path="/tournaments"
            element={<CategoryView topic={'Tournaments'} img={vs} />}
          />
          <Route
            path="/streaming"
            element={<CategoryView topic={'Streaming'} img={stream} />}
          />
          <Route
            path="/entertainment"
            element={<CategoryView topic={'Entertainment'} img={ent} />}
          />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
};

export default App;
