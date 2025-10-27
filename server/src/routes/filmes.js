
import { exec } from 'child_process';
import { Router } from 'express';
import path from 'path';

const router = Router();


const scraperPath = path.resolve(process.cwd(), '..','script_python', 'web-scrapping.py');

router.get('/now-playing', (req, res) => {
  exec(`python "${scraperPath}"`, { maxBuffer: 1024 * 1024 }, (err, stdout, stderr) => {
    if (err) {
      console.error('Erro ao rodar scraper:', err, stderr);
      return res.status(500).json({ error: 'falha ao obter filmes' });
    }
    try {
      const filmes = JSON.parse(stdout);
      res.json(filmes);
    } catch (parseErr) {
      console.error('JSON inválido do scraper:', parseErr, stdout);
      res.status(500).json({ error: 'resposta do scraper inválida' });
    }
  });
});

export default router;
