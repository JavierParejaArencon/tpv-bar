import React from 'react';
import { useAppContext } from '../context/AppContext';

export default function MenuBebidas() {
  const { bebidas, addToTicket } = useAppContext();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {bebidas.map((b) => (
        <button
          key={b.id}
          onClick={() => addToTicket(b)}
          className="flex flex-col items-center justify-center bg-orange-200 hover:bg-orange-300 rounded-2xl shadow p-4 transition"
        >
          <span className="text-lg font-semibold">{b.nombre}</span>
          <span className="text-sm text-gray-700">{b.precio.toFixed(2)} €</span>
          <span className="text-xs mt-1 text-gray-500">
            Stock: {b.stock}
          </span>
        </button>
      ))}
    </div>
  );
}
