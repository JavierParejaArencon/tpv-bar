const API = 'http://localhost:3001';

export async function createTicket(ticket) {
  const res = await fetch(`${API}/ventas/ticket`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticket),
  });
  if (!res.ok) throw new Error('Error al crear ticket');
  return res.json(); // devuelve { ventaId, fecha, total }
}

export async function fetchReport(fecha) {
  const res = await fetch(`${API}/ventas/report?fecha=${fecha}`);
  if (!res.ok) throw new Error('Error al obtener reporte');
  return res.json();
}
