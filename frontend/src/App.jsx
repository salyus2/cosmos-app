// FILENAME: src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserHome from "./pages/UserHome";
import AdminPanel from './components/AdminPanel';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Cosmos App</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/usuario" />} />
          <Route path="/usuario" element={<UserHome />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;