import express from "express";
const app = express();

import { calculateBmi } from "./bmiCalculator";
import {calculateExercises} from './exerciseCalculator';

app.use(express.json()); // for parsing application/json

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res.status(400).send("malformatted parameters");
  } else {
    res.send({
      height,
      weight,
      bmi: calculateBmi(Number(height), Number(weight)),
    });
  }
});

app.post("/calculateExercises", (req, res) => {
  console.log('req.body', req.body);
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if([daily_exercises, target].includes(undefined)) {
    res.status(400).send("parameters missing");
  }
  if(!Array.isArray(daily_exercises) || isNaN(Number(target)) || daily_exercises.some(exe => isNaN(Number(exe)))) {
    res.status(400).send("malformatted parameters");
  }
  else {
    const fExes = daily_exercises.map(Number);
    const calcRes = calculateExercises(fExes, Number(target));
    res.send(calcRes);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
