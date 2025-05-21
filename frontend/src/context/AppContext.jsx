import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchBebidas } from '../services/inventarioService';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ticket, setTicket] = useState([]);
  const [bebidas, setBebidas] = useState([]);

  // Al montar, cargar inventario de bebidas
  useEffect(() => {
    fetchBebidas().then((lista) => setBebidas(lista));
  }, []);

  const addToTicket = (bebida) => {
    setTicket((prev) => {
      const encontrado = prev.find((l) => l.id === bebida.id);
      if (encontrado) {
        return prev.map((l) =>
          l.id === bebida.id ? { ...l, cantidad: l.cantidad + 1 } : l
        );
      }
      return [...prev, { ...bebida, cantidad: 1 }];
    });
  };

  const clearTicket = () => setTicket([]);

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      ticket,
      setTicket,
      bebidas,
      setBebidas,
      addToTicket,
      clearTicket
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
