import express from 'express';
import  cors  from 'cors';

import diagnosRouter from './routes/diagnoses';

const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/diagnoses',diagnosRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});