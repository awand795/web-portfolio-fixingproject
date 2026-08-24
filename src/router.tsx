import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from './Component/LoadingSpinner';
import ScrollToTop from './Component/ScrollToTop';

const App = lazy(() => import('./app'));
const Socmed = lazy(() => import('./socmedlink/socmed'));
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminEditor = lazy(() => import('./pages/AdminEditor'));
const NotFound = lazy(() => import('./Component/NotFound'));

const Router = () => {
    return (
      <>
        <ScrollToTop />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/socmed' element={<Socmed/>}/>
            <Route path='/blog' element={<BlogList/>}/>
            <Route path='/blog/:slug' element={<BlogPost/>}/>
            <Route path='/admin' element={<AdminDashboard/>}/>
            <Route path='/admin/login' element={<AdminLogin/>}/>
            <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
            <Route path='/admin/editor' element={<AdminEditor/>}/>
            <Route path='/admin/editor/:id' element={<AdminEditor/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Suspense>
      </>
    );
  }

export default Router;
