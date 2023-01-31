function calculateBmi(height: number, weight: number) {
  const heightM = height / 100;
  const BMI = weight / (heightM * heightM);

  if (BMI < 18.4) {
    return "Underweight";
  } else if (BMI < 24.9) {
    return "Normal range";
  } else if (BMI < 29.9) {
    return "Overweight";
  }
}

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);
console.log(calculateBmi(height, weight));
