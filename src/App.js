// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClientsPage from './pages/ClientsPage';
import CoffeePage from "./pages/CoffeePage";
import CreateAppointment from './pages/CreateAppointment';




//import LotsPage from './pages/LotsPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex gap-4">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/clientes">Clientes</Link></li>
          <li><Link to="/compras">Compras</Link></li>
          <li><Link to="/crear-cita">cita</Link></li>
         
          {/* <li><Link to="/lotes">Lotes</Link></li> */}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clientes" element={<ClientsPage />} />
        <Route path="/compras" element={<CoffeePage />} />
        <Route path="/crear-cita" element={<CreateAppointment />} />
        {/* <Route path="/lotes" element={<LotsPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
