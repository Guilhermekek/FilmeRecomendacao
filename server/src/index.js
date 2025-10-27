// server/src/index.js
import cors from 'cors';
import express from 'express';

import filmsRouter from './routes/filmes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Rotas
app.use('/filmes', filmsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
