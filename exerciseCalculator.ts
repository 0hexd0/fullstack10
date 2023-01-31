interface ExeResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const target = 2;

function calculateExercises(exeData: Array<number>): ExeResult {
  const average =
    exeData.reduce((prev, cur) => {
      return cur + prev;
    }, 0) / exeData.length;
  let ratingDescription = "";
  const rating = average / target;
  if (rating >= 1) {
    ratingDescription = "great!";
  } else if (rating >= 0.8) {
    ratingDescription = "not too bad but could be better";
  } else {
    ratingDescription = "not good";
  }
  return {
    periodLength: exeData.length,
    trainingDays: exeData.filter((i) => i > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
}

const exeData = process.argv.slice(2).map(Number);
console.log(calculateExercises(exeData));
