import { lazy } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout';

import Maps from './Maps';
import Home from 'pages/Home';
const AboutUs = lazy(() => import('./AboutUs'));
const About = lazy(() => import('../pages/About'));
const Add = lazy(() => import('../pages/Add'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/dashboard" element={<SharedLayout />}>
        <Route index element={<Maps />} />
        <Route path="about" element={<About />}>
          <Route index element={<AboutUs />} />
        </Route>
        <Route path="add" element={<Add />}></Route>
      </Route>
    </Routes>
  );
};
