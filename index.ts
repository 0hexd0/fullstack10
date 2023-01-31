import express from "express";
const app = express();

import { calculateBmi } from "./bmiCalculator";

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
