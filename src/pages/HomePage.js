import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Bienvenido al Sistema de Gestión de Café</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
        <Link
          to="/clientes"
          className="bg-blue-500 text-white py-4 px-6 rounded-lg text-center shadow hover:bg-blue-600 transition"
        >
          Módulo de Clientes
        </Link>

        <Link
          to="/compras"
          className="bg-green-500 text-white py-4 px-6 rounded-lg text-center shadow hover:bg-green-600 transition"
        >
          Módulo de Compras de Café
        </Link>

        <Link
          to="/lotes"
          className="bg-yellow-500 text-white py-4 px-6 rounded-lg text-center shadow hover:bg-yellow-600 transition"
        >
          Módulo de Lotes
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
