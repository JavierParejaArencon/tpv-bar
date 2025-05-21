const API = 'http://localhost:3001';

export async function fetchBebidas() {
  const res = await fetch(`${API}/inventario`);
  if (!res.ok) throw new Error('Error al obtener inventario');
  return res.json();
}

export async function updateStock(id, delta) {
  const res = await fetch(`${API}/inventario/${id}/stock`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ delta })
  });
  if (!res.ok) throw new Error('Error al actualizar stock');
  return res.json();
}
