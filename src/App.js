import React from 'react';
import { ReactDOM } from 'react';
import Home from './Home';
import {BrowserRouter, Router,Routes,Route} from "react-router-dom"
import TodoPage from './TodoPage';
import Footer from './Footer';



const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TodoPage" element={<TodoPage />} />
      </Routes>
      
  
  );
};




export default App;
