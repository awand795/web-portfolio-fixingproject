import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from './Component/LoadingSpinner';
import ScrollToTop from './Component/ScrollToTop';

const App = lazy(() => import('./app'));
const Socmed = lazy(() => import('./socmedlink/socmed'));
const NotFound = lazy(() => import('./Component/NotFound'));

const Router = () => {
    return (
      <div className="App">
        <ScrollToTop />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route exact path='/' element={<App/>}/>
            <Route path='/socmed' element={<Socmed/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Suspense>
      </div>
    );
  }

export default Router;
