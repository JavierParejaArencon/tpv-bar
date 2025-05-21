// backend/routes/inventario.js
import express from 'express';
import { getAllBebidas, upsertBebida, updateStock } from '../models/bebida.js';

const router = express.Router();

// GET /inventario → lista de bebidas
router.get('/', async (req, res) => {
  const lista = await getAllBebidas();
  res.json(lista);
});

// POST /inventario → crear o actualizar bebida
router.post('/', async (req, res) => {
  const { nombre, stock, precio } = req.body;
  await upsertBebida({ nombre, stock, precio });
  res.status(201).json({ ok: true });
});

// PATCH /inventario/:id/stock → modificar stock (delta puede ser negativo para restar)
router.patch('/:id/stock', async (req, res) => {
  const { delta } = req.body; // ej. { delta: -2 }
  const bebida = await updateStock(req.params.id, delta);
  const alerta = bebida.stock < 10;
  res.json({ bebida, alerta });
});

export default router;
