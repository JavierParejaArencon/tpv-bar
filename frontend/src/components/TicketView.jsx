import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { createTicket } from '../services/ventasService';
import { generatePdfTicket } from '../services/pdfService';
import Modal from './Modal';

export default function TicketView() {
  const { ticket, clearTicket } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const total = ticket.reduce((sum, l) => sum + l.precio * l.cantidad, 0);

  const handleCobrar = async () => {
    if (ticket.length === 0) {
      setModalMessage('No hay ítems en el ticket.');
      setShowModal(true);
      return;
    }
    try {
      const venta = await createTicket({ mesa: 1, lineas: ticket });
      generatePdfTicket({ ...venta, lineas: ticket });
      clearTicket();
      setModalMessage('¡Venta registrada y ticket generado!');
      setShowModal(true);
    } catch (err) {
      setModalMessage('Error al registrar la venta.');
      setShowModal(true);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-auto flex-grow">
        {ticket.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Añade bebidas al ticket.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Producto</th>
                <th className="text-center">Cant</th>
                <th className="text-right">Precio</th>
              </tr>
            </thead>
            <tbody>
              {ticket.map((l) => (
                <tr key={l.id} className="border-b">
                  <td className="py-1">{l.nombre}</td>
                  <td className="py-1 text-center">{l.cantidad}</td>
                  <td className="py-1 text-right">{(l.precio * l.cantidad).toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="mt-4">
        <div className="text-lg font-bold">Total: {total.toFixed(2)} €</div>
        <button
          onClick={handleCobrar}
          className="mt-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Cobrar
        </button>
      </div>

      {/* Modal para mensajes */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <p className="text-center">{modalMessage}</p>
      </Modal>
    </div>
  );
}
