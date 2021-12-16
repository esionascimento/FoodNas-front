import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Dashboard } from './pages/dashboard/Dashboard';
import { Register } from './components/register';
import { Home } from './pages/home';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
