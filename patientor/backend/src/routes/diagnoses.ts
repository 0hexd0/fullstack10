import express from 'express';
import diagnosService from '../services/diagnosService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosService.getEntries());
});

export default router;