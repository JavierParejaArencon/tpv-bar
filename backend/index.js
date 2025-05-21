// backend/index.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import inventarioRoutes from './routes/inventario.js';
import ventasRoutes from './routes/ventas.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/inventario', inventarioRoutes);
app.use('/ventas', ventasRoutes);

// Puerto por defecto 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend escuchando en http://localhost:${PORT}`));
