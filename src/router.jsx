import React from "react";
import { Routes, Route } from "react-router-dom";
import App from './app'
import Socmed from './socmedlink/socmed'

const Router = () => {
    return (
      <div className="App">
        <Routes>
          <Route exact path='/' element={<App/>}/>
          <Route path='/socmed' element={<Socmed/>}/>
          <Route path="*" element={<App/>}/>
        </Routes>
      </div>
    );
  }

export default Router;