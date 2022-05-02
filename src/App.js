import './App.css';
import Header from './components/Header/Header';
import Main from './components/MainContent/Main';
import Footer from './components/Footer/Footer';
import CategoryView from './components/CategoryView/CategoryView';
import ProfilePage from './components/ProfilePage/ProfilePage';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AboutPage from './views/AboutPage/AboutPage';

const App = () => {
  return (
    // <BrowserRouter>
    //   <div>
    //     <Header />
    //   </div>
    //   <Routes>
    //     <Route path="/" element={<Main />} />
    //     <Route path="/home" element={<Main />} />
    //     <Route path="/about" element={<AboutPage />} />
    //   </Routes>
    // </BrowserRouter>



    <div>
      <Header />
      {/* <Main /> */}
      <ProfilePage />
      {/* <CategoryView /> */}
    </div>
  );
};

export default App;
