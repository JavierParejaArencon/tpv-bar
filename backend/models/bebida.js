// backend/models/bebida.js
import { openDb } from '../db.js';

export async function getAllBebidas() {
  const db = await openDb();
  return db.all('SELECT * FROM bebidas');
}

export async function upsertBebida({ nombre, stock, precio }) {
  const db = await openDb();
  return db.run(
    `INSERT INTO bebidas (nombre, stock, precio)
     VALUES (?, ?, ?)
     ON CONFLICT(nombre) DO UPDATE SET stock = ?, precio = ?`,
    [nombre, stock, precio, stock, precio]
  );
}

export async function updateStock(id, delta) {
  const db = await openDb();
  await db.run(`UPDATE bebidas SET stock = stock + ? WHERE id = ?`, [delta, id]);
  return db.get(`SELECT * FROM bebidas WHERE id = ?`, [id]);
}
