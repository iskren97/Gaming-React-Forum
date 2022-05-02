import './App.css';
import Header from './components/Header/Header';
import Main from './components/MainContent/Main';
import Footer from './components/Footer/Footer';
import CategoryView from './components/CategoryView/CategoryView';
import ProfilePage from './components/ProfilePage/ProfilePage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AboutPage from './views/AboutPage/AboutPage';
import ErrorPage from './views/ErrorPage/ErrorPage';

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Main />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
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
