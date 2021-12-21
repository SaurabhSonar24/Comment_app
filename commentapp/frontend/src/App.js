import React from "react";
import './App.css';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Data from "./components/Data";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Registration from "./components/Registartion";
import Comments from "./components/Comments";

function App() {
 
  return (
   <>
  <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/addpost" element={<Data/>} />
        <Route path="/comments" element={<Comments/>} />
      </Routes>
    </Router>
   </>
  );
}

export default App;
