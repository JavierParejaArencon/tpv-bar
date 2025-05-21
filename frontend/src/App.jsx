import React, { useContext } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Login from './components/Login';
import MenuBebidas from './components/MenuBebidas';
import TicketView from './components/TicketView';

function AppContent() {
  const { user } = useContext(useAppContext());

  return (
    <div className="min-h-screen bg-neutral-100 p-4 font-sans">
      {user ? (
        <div className="grid grid-cols-3 gap-4 h-full">
          {/* Columna 1: Menú de Bebidas */}
          <div className="bg-white rounded-2xl shadow p-4 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Bebidas</h2>
            <MenuBebidas />
          </div>

          {/* Columna 2: Ticket */}
          <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-center">Ticket</h2>
            <TicketView />
          </div>

          {/* Columna 3: Configuración o Caja */}
          <div className="bg-white rounded-2xl shadow p-4 text-center">
            <h2 className="text-xl font-semibold mb-2">Configuración / Caja</h2>
            <p className="text-gray-500">Próximas funcionalidades (reportes gráficos, ajustes de precios, etc.).</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Login />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
