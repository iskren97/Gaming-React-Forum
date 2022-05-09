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

const App = () => {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  let [user, loading, error] = useAuthState(auth);

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
          <Route path="/all_posts" element={<Posts />} />
          <Route
            path="/general_discussion"
            element={<CategoryView topic={'General Discussion'} />}
          />
          <Route
            path="/shooters"
            element={<CategoryView topic={'Shooters'} />}
          />
          <Route path="/mmorpg" element={<CategoryView topic={'MMORPG'} />} />
          <Route
            path="/rts"
            element={<CategoryView topic={'Real Time Strategy'} />}
          />

          <Route
            path="/adventure"
            element={<CategoryView topic={'Adventure'} />}
          />
          <Route
            path="/gaming_pc"
            element={<CategoryView topic={'Gaming Laptops and PCs'} />}
          />
          <Route
            path="/gaming_accessories"
            element={<CategoryView topic={'Gaming Accessories'} />}
          />
          <Route
            path="/tournaments"
            element={<CategoryView topic={'Tournaments'} />}
          />
          <Route
            path="/streaming"
            element={<CategoryView topic={'Streaming'} />}
          />
          <Route
            path="/entertainment"
            element={<CategoryView topic={'Entertainment'} />}
          />
          <Route
            path="/profile/:username"
            element={<ProfilePage key={window.location.pathname} />}
          />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
};

export default App;
