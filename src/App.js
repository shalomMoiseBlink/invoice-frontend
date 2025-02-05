import React from 'react';
import { BrowserRouter, Routes, Route,Navigate  } from "react-router-dom";
import MainPage from './components/MainPage';
import Return from './components/Return';
import Header from './components/Header';
import Error from './components/Error';
import PaidInvoice from './components/PaidInvoice';

function App() {
  return (
    <div className='container'>
      <Header />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route  path="/return" element={<Return />} />
      <Route  path="/paidInvoice/:id" element={<PaidInvoice />} />
      <Route  path="/error" element={<Error />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
  </div>
  );

}

export default App;
