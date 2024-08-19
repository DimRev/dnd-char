const str1qa: TimedNonValueQA = {
  type: "timedNonValue",
  question: {
    type: "timedNonValue",
    stat: "str",
    question: "How long can you keep your arm outstretched?",
    currAnswer: 0,
  },
  answer: {
    type: "timedNonValue",
    resScoreFormula: (elapsedTime: number) => {
      const seconds = Math.floor(elapsedTime / 1000);
      if (seconds < 5) return -3;
      if (seconds < 10) return -2;
      if (seconds < 30) return -1;
      if (seconds < 50) return 0;
      if (seconds < 100) return 1;
      if (seconds < 150) return 2;
      return 3;
    },
  },
};

const str2qa: NumericRangeQA = {
  type: "numericRange",
  question: {
    type: "numericRange",
    stat: "str",
    question: "How many push-ups can you do in one minute?",
    currAnswer: 0,
  },
  answer: {
    type: "numericRange",
    resScoreFormula: (answer: number) => {
      const pushups = answer;
      if (pushups < 5) return -3;
      if (pushups < 10) return -2;
      if (pushups < 20) return -1;
      if (pushups < 30) return 0;
      if (pushups < 40) return 1;
      if (pushups < 50) return 2;
      return 3;
    },
  },
};

const con1qa: TimedNonValueQA = {
  type: "timedNonValue",
  question: {
    type: "timedNonValue",
    stat: "con",
    question: "How long can you hold your breath?",
    currAnswer: 0,
  },
  answer: {
    type: "timedNonValue",
    resScoreFormula: (elapsedTime: number) => {
      const seconds = Math.floor(elapsedTime / 1000);
      if (seconds < 10) return -3;
      if (seconds < 20) return -2;
      if (seconds < 30) return -1;
      if (seconds < 50) return 0;
      if (seconds < 70) return 1;
      if (seconds < 100) return 2;
      return 3;
    },
  },
};

const con2qa: NumericRangeQA = {
  type: "numericRange",
  question: {
    type: "numericRange",
    stat: "con",
    question: "How many laps can you run without stopping?",
    currAnswer: 0,
  },
  answer: {
    type: "numericRange",
    resScoreFormula: (answer: number) => {
      const laps = answer;
      if (laps < 1) return -3;
      if (laps < 2) return -2;
      if (laps < 3) return -1;
      if (laps < 5) return 0;
      if (laps < 7) return 1;
      if (laps < 10) return 2;
      return 3;
    },
  },
};

const dex1qa: TimedVerbalQA = {
  type: "timedVerbal",
  question: {
    type: "timedVerbal",
    stat: "dex",
    question: "How quickly can you type the alphabet?",
    currAnswer: "",
  },
  answer: {
    type: "timedVerbal",
    resScoreFormula: (elapsedTime: number, answer: string = "") => {
      const seconds = Math.floor(elapsedTime / 1000);

      // Simulate a method to measure typing accuracy (from 0 to 1, where 1 is 100% accurate)
      const expectedAnswer = "abcdefghijklmnopqrstuvwxyz";
      let accuracy = 0;
      if (answer.length === expectedAnswer.length) {
        accuracy =
          answer.split("").filter((char, i) => char === expectedAnswer[i])
            .length / expectedAnswer.length;
      }

      // Base score based on time
      let baseScore;
      if (seconds < 5) baseScore = 3;
      else if (seconds < 10) baseScore = 2;
      else if (seconds < 15) baseScore = 1;
      else if (seconds < 20) baseScore = 0;
      else if (seconds < 30) baseScore = -1;
      else if (seconds < 40) baseScore = -2;
      else baseScore = -3;

      // Adjust the score based on accuracy
      const adjustedScore = Math.floor(baseScore * accuracy);

      if (adjustedScore < -3) return -3;
      if (adjustedScore > 3) return 3;

      return adjustedScore as ScoreFormulaResult;
    },
  },
};

const dex2qa: TimedVerbalQA = {
  type: "timedVerbal",
  question: {
    type: "timedVerbal",
    stat: "dex",
    question: "How quickly can you type the numbers 0-9?",
    currAnswer: "",
  },
  answer: {
    type: "timedVerbal",
    resScoreFormula: (elapsedTime: number, answer: string = "") => {
      const seconds = Math.floor(elapsedTime / 1000);

      // Simulate a method to measure typing accuracy (from 0 to 1, where 1 is 100% accurate)
      const expectedAnswer = "0123456789";
      let accuracy = 0;
      if (answer.length === expectedAnswer.length) {
        accuracy =
          answer.split("").filter((char, i) => char === expectedAnswer[i])
            .length / expectedAnswer.length;
      }

      // Base score based on time
      let baseScore;
      if (seconds < 3) baseScore = 3;
      else if (seconds < 4) baseScore = 2;
      else if (seconds < 5) baseScore = 1;
      else if (seconds < 7) baseScore = 0;
      else if (seconds < 9) baseScore = -1;
      else if (seconds < 10) baseScore = -2;
      else baseScore = -3;

      // Adjust the score based on accuracy
      const adjustedScore = Math.floor(baseScore * accuracy);

      if (adjustedScore < -3) return -3;
      if (adjustedScore > 3) return 3;

      return adjustedScore as ScoreFormulaResult;
    },
  },
};

const int2qa: TimedNumericQA = {
  type: "timedNumeric",
  question: {
    type: "timedNumeric",
    stat: "int",
    question:
      "How quickly can you solve the math problem: 4 / 2 + 4 * (2 + 4) * 2?",
    currAnswer: 0,
  },
  answer: {
    type: "timedNumeric",
    resScoreFormula: (elapsedTime: number, answer?: number) => {
      const seconds = Math.floor(elapsedTime / 1000);

      // The correct answer for the problem is 50
      const correctAnswer = 50;
      let baseScore;

      // Adjust base score based on time and correctness
      if (answer === correctAnswer) {
        if (seconds < 10) baseScore = 3;
        else if (seconds < 20) baseScore = 2;
        else if (seconds < 30) baseScore = 1;
        else if (seconds < 40) baseScore = 0;
        else if (seconds < 60) baseScore = -1;
        else baseScore = -2;
      } else {
        // Penalize incorrect answers
        baseScore = -3;
      }

      return baseScore as ScoreFormulaResult;
    },
  },
};

export const strQAs: QuestionAnswer[] = [str1qa, str2qa];
export const dexQAs: QuestionAnswer[] = [dex1qa, dex2qa];
export const conQAs: QuestionAnswer[] = [con1qa, con2qa];
