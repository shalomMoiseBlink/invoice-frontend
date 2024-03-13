import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './components/MainPage';
import Return from './components/Return';
import Header from './components/Header';


function App() {
 

  return (
    <div>
      <Header />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />}>
 
      </Route>
      <Route  path="/return" element={<Return />} />
    </Routes>
  </BrowserRouter>
  </div>
  );

}

export default App;
