// backend/routes/ventas.js
import express from 'express';
import { openDb } from '../db.js';
import PdfPrinter from 'pdfmake';

const router = express.Router();

// POST /ventas/ticket → registra venta y descuenta stock
router.post('/ticket', async (req, res) => {
  const { mesa, lineas } = req.body;
  const db = await openDb();
  const fecha = new Date().toISOString();
  const total = lineas.reduce((sum, l) => sum + l.cantidad * l.precio, 0);

  // 1) Insertar venta
  const result = await db.run(
    `INSERT INTO ventas (fecha, mesa, total) VALUES (?, ?, ?)`,
    [fecha, mesa, total]
  );
  const ventaId = result.lastID;

  // 2) Insertar líneas y descontar stock
  for (const l of lineas) {
    await db.run(
      `INSERT INTO lineas_venta (venta_id, bebida_id, cantidad, precio_unit)
       VALUES (?, ?, ?, ?)`,
      [ventaId, l.bebida_id, l.cantidad, l.precio]
    );
    await db.run(
      `UPDATE bebidas SET stock = stock - ? WHERE id = ?`,
      [l.cantidad, l.bebida_id]
    );
  }

  res.json({ ventaId, fecha, total });
});

// GET /ventas/report?fecha=YYYY-MM-DD → reporte de ingresos del día
router.get('/report', async (req, res) => {
  const { fecha } = req.query; // formato ISO
  const db = await openDb();
  const rows = await db.all(
    `SELECT SUM(total) as ingresos FROM ventas WHERE DATE(fecha)=DATE(?)`,
    [fecha]
  );
  res.json({ fecha, ingresos: rows[0].ingresos || 0 });
});

// GET /ventas/excel → exportar todas las ventas en Excel
router.get('/excel', async (req, res) => {
  const db = await openDb();
  const rows = await db.all(`SELECT * FROM ventas`);
  const XLSX = await import('xlsx');
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'ventas');
  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  res
    .setHeader('Content-Disposition', 'attachment; filename="reporte.xlsx"')
    .send(buf);
});

export default router;
