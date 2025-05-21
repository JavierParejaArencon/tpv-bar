// backend/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
  return open({
    filename: './bar.db',
    driver: sqlite3.Database
  });
}

// Inicializar tablas si no existen
(async () => {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS bebidas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT UNIQUE,
      stock INTEGER,
      precio REAL
    );
  `);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS ventas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fecha TEXT,
      mesa INTEGER,
      total REAL
    );
  `);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS lineas_venta (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      venta_id INTEGER,
      bebida_id INTEGER,
      cantidad INTEGER,
      precio_unit REAL,
      FOREIGN KEY(venta_id) REFERENCES ventas(id),
      FOREIGN KEY(bebida_id) REFERENCES bebidas(id)
    );
  `);
})();
