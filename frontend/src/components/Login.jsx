import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Login() {
  const { setUser } = useAppContext();
  const [nombre, setNombre] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (nombre.trim()) {
      setUser({ nombre });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Nombre del camarero"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
