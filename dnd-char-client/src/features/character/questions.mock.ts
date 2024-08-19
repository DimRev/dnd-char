const str1: TimedNumericQuestion = {
  stat: "str",
  question:
    "How long can you keep your arm straight out without lowering it? (seconds)",
  type: "timedNumeric",
  answer: 60, // Example answer
  resFormula: (answer: number, elapsedTime: number) => {
    if (answer != 60) return -3; // Expecting a real-world answer
    if (elapsedTime > 60000) return -2;
    if (elapsedTime > 40000) return -1;
    if (elapsedTime > 20000) return 0;
    if (elapsedTime > 10000) return 1;
    if (elapsedTime > 5000) return 2;
    return 3;
  },
};

const str2: TimedNumericQuestion = {
  stat: "str",
  question: "How many times can you clench your fist tightly in 30 seconds?",
  type: "timedNumeric",
  answer: 40, // Example answer
  resFormula: (answer: number, elapsedTime: number) => {
    if (elapsedTime > 30000) return -3;
    if (answer < 10) return -2;
    if (answer < 20) return -1;
    if (answer < 30) return 0;
    if (answer < 40) return 1;
    if (answer < 50) return 2;
    return 3;
  },
};

const str3: NumericRangeQuestion = {
  stat: "str",
  question:
    "How hard can you press down on the desk with your palms for 10 seconds? (Rate yourself from 1 to 10)",
  type: "numericRange",
  answer: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  resFormula: (answer: number) => {
    if (answer < 2) return -3;
    if (answer < 4) return -2;
    if (answer < 6) return -1;
    if (answer < 8) return 0;
    if (answer < 9) return 1;
    if (answer < 10) return 2;
    return 3;
  },
};

const str4: TimedNumericQuestion = {
  stat: "str",
  question: "How long can you hold a water bottle at arm's length? (seconds)",
  type: "timedNumeric",
  answer: 45, // Example answer
  resFormula: (answer: number, elapsedTime: number) => {
    if (answer != 45) return -3;
    if (elapsedTime > 60000) return -2;
    if (elapsedTime > 45000) return -1;
    if (elapsedTime > 30000) return 0;
    if (elapsedTime > 20000) return 1;
    if (elapsedTime > 10000) return 2;
    return 3;
  },
};

const str5: TimedNumericQuestion = {
  stat: "str",
  question: "How many times can you flex your bicep in 30 seconds?",
  type: "timedNumeric",
  answer: 50, // Example answer
  resFormula: (answer: number, elapsedTime: number) => {
    if (elapsedTime > 30000) return -3;
    if (answer < 20) return -2;
    if (answer < 30) return -1;
    if (answer < 40) return 0;
    if (answer < 50) return 1;
    if (answer < 60) return 2;
    return 3;
  },
};

const str6: TimedNumericQuestion = {
  stat: "str",
  question:
    "How many times can you lift a small object like a book overhead in 30 seconds?",
  type: "timedNumeric",
  answer: 30, // Example answer
  resFormula: (answer: number, elapsedTime: number) => {
    if (elapsedTime > 30000) return -3;
    if (answer < 10) return -2;
    if (answer < 20) return -1;
    if (answer < 30) return 0;
    if (answer < 40) return 1;
    if (answer < 50) return 2;
    return 3;
  },
};

const str7: NumericRangeQuestion = {
  stat: "str",
  question:
    "How tightly can you grip your phone for 10 seconds? (Rate yourself from 1 to 10)",
  type: "numericRange",
  answer: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  resFormula: (answer: number) => {
    if (answer < 2) return -3;
    if (answer < 4) return -2;
    if (answer < 6) return -1;
    if (answer < 8) return 0;
    if (answer < 9) return 1;
    if (answer < 10) return 2;
    return 3;
  },
};

const dex1: WPMTestQuestion = {
  stat: "dex",
  question:
    "Type the following sentence as fast as you can: 'The quick brown fox jumps over the lazy dog.'",
  type: "wpmTest",
  answer: "The quick brown fox jumps over the lazy dog.",
  resFormula: (userInput: string, elapsedTime: number) => {
    const correctAnswer = "the quick brown fox jumps over the lazy dog";
    const processedInput = userInput.toLowerCase().trim();

    // Calculate accuracy
    const totalChars = correctAnswer.length;
    let correctChars = 0;
    for (let i = 0; i < totalChars; i++) {
      if (processedInput[i] === correctAnswer[i]) {
        correctChars++;
      }
    }
    const accuracy = (correctChars / totalChars) * 100;

    // Calculate WPM
    const timeInMinutes = elapsedTime / 60000;
    const wordsTyped = processedInput.split(" ").length;
    const wpm = wordsTyped / timeInMinutes;

    // Score based on WPM and accuracy
    let accScore = 0;
    let wpmScore = 0;
    // Adjust score based on accuracy
    if (accuracy < 50) accScore = -3;
    else if (accuracy < 55) accScore = -2;
    else if (accuracy < 60) accScore = -1;
    else if (accuracy < 65) accScore = 0;
    else if (accuracy < 70) accScore = 1;
    else if (accuracy < 85) accScore = 2;
    else if (accuracy < 90) accScore = 3;

    if (accuracy >= 80) {
      if (wpm < 20) wpmScore = -3;
      else if (wpm < 35) wpmScore = -2;
      else if (wpm < 50) wpmScore = -1;
      else if (wpm < 65) wpmScore = 0;
      else if (wpm < 80) wpmScore = 1;
      else if (wpm < 95) wpmScore = 2;
      else if (wpm < 110) wpmScore = 3;
    }

    let score = Math.floor((accScore + wpmScore) / 2);
    if (score < -3) score = -3;
    else if (score > 3) score = 3;

    return score as ResFormulaAnswer;
  },
};

const dex2: WPMTestQuestion = {
  stat: "dex",
  question:
    "Type the following sentence as fast as you can: 'To be or not to be, that is the question.'",
  type: "wpmTest",
  answer: "To be or not to be, that is the question.",
  resFormula: (userInput: string, elapsedTime: number) => {
    const correctAnswer = "to be or not to be, that is the question";
    const processedInput = userInput.toLowerCase().trim();

    // Calculate accuracy
    const totalChars = correctAnswer.length;
    let correctChars = 0;
    for (let i = 0; i < totalChars; i++) {
      if (processedInput[i] === correctAnswer[i]) {
        correctChars++;
      }
    }
    const accuracy = (correctChars / totalChars) * 100;

    // Calculate WPM
    const timeInMinutes = elapsedTime / 60000;
    const wordsTyped = processedInput.split(" ").length;
    const wpm = wordsTyped / timeInMinutes;

    // Score based on WPM and accuracy
    let accScore = 0;
    let wpmScore = 0;

    // Adjust score based on accuracy
    if (accuracy < 50) accScore = -3;
    else if (accuracy < 55) accScore = -2;
    else if (accuracy < 60) accScore = -1;
    else if (accuracy < 65) accScore = 0;
    else if (accuracy < 70) accScore = 1;
    else if (accuracy < 85) accScore = 2;
    else if (accuracy < 90) accScore = 3;

    if (accuracy >= 80) {
      if (wpm < 20) wpmScore = -3;
      else if (wpm < 35) wpmScore = -2;
      else if (wpm < 50) wpmScore = -1;
      else if (wpm < 65) wpmScore = 0;
      else if (wpm < 80) wpmScore = 1;
      else if (wpm < 95) wpmScore = 2;
      else if (wpm < 110) wpmScore = 3;
    }

    let score = Math.floor((accScore + wpmScore) / 2);
    if (score < -3) score = -3;
    else if (score > 3) score = 3;

    return score as ResFormulaAnswer;
  },
};

const dex3: WPMTestQuestion = {
  stat: "dex",
  question:
    "Type the following sentence as fast as you can: 'It was the best of times, it was the worst of times.'",
  type: "wpmTest",
  answer: "It was the best of times, it was the worst of times.",
  resFormula: (userInput: string, elapsedTime: number) => {
    const correctAnswer = "it was the best of times, it was the worst of times";
    const processedInput = userInput.toLowerCase().trim();

    // Calculate accuracy
    const totalChars = correctAnswer.length;
    let correctChars = 0;
    for (let i = 0; i < totalChars; i++) {
      if (processedInput[i] === correctAnswer[i]) {
        correctChars++;
      }
    }
    const accuracy = (correctChars / totalChars) * 100;

    // Calculate WPM
    const timeInMinutes = elapsedTime / 60000;
    const wordsTyped = processedInput.split(" ").length;
    const wpm = wordsTyped / timeInMinutes;

    // Score based on WPM and accuracy
    let accScore = 0;
    let wpmScore = 0;

    // Adjust score based on accuracy
    if (accuracy < 50) accScore = -3;
    else if (accuracy < 55) accScore = -2;
    else if (accuracy < 60) accScore = -1;
    else if (accuracy < 65) accScore = 0;
    else if (accuracy < 70) accScore = 1;
    else if (accuracy < 85) accScore = 2;
    else if (accuracy < 90) accScore = 3;

    if (accuracy >= 80) {
      if (wpm < 20) wpmScore = -3;
      else if (wpm < 35) wpmScore = -2;
      else if (wpm < 50) wpmScore = -1;
      else if (wpm < 65) wpmScore = 0;
      else if (wpm < 80) wpmScore = 1;
      else if (wpm < 95) wpmScore = 2;
      else if (wpm < 110) wpmScore = 3;
    }

    let score = Math.floor((accScore + wpmScore) / 2);
    if (score < -3) score = -3;
    else if (score > 3) score = 3;

    return score as ResFormulaAnswer;
  },
};

const dex4: WPMTestQuestion = {
  stat: "dex",
  question:
    "Type the following sentence as fast as you can: 'Success is not final, failure is not fatal: It is the courage to continue that counts.'",
  type: "wpmTest",
  answer:
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  resFormula: (userInput: string, elapsedTime: number) => {
    const correctAnswer =
      "success is not final, failure is not fatal: it is the courage to continue that counts";
    const processedInput = userInput.toLowerCase().trim();

    // Calculate accuracy
    const totalChars = correctAnswer.length;
    let correctChars = 0;
    for (let i = 0; i < totalChars; i++) {
      if (processedInput[i] === correctAnswer[i]) {
        correctChars++;
      }
    }
    const accuracy = (correctChars / totalChars) * 100;

    // Calculate WPM
    const timeInMinutes = elapsedTime / 60000;
    const wordsTyped = processedInput.split(" ").length;
    const wpm = wordsTyped / timeInMinutes;

    // Score based on WPM and accuracy
    let accScore = 0;
    let wpmScore = 0;

    // Adjust score based on accuracy
    if (accuracy < 50) accScore = -3;
    else if (accuracy < 55) accScore = -2;
    else if (accuracy < 60) accScore = -1;
    else if (accuracy < 65) accScore = 0;
    else if (accuracy < 70) accScore = 1;
    else if (accuracy < 85) accScore = 2;
    else if (accuracy < 90) accScore = 3;

    if (accuracy >= 80) {
      if (wpm < 20) wpmScore = -3;
      else if (wpm < 35) wpmScore = -2;
      else if (wpm < 50) wpmScore = -1;
      else if (wpm < 65) wpmScore = 0;
      else if (wpm < 80) wpmScore = 1;
      else if (wpm < 95) wpmScore = 2;
      else if (wpm < 110) wpmScore = 3;
    }

    let score = Math.floor((accScore + wpmScore) / 2);
    if (score < -3) score = -3;
    else if (score > 3) score = 3;

    return score as ResFormulaAnswer;
  },
};

const dex5: WPMTestQuestion = {
  stat: "dex",
  question:
    "Type the following sentence as fast as you can: 'I have never let my schooling interfere with my education.'",
  type: "wpmTest",
  answer: "I have never let my schooling interfere with my education.",
  resFormula: (userInput: string, elapsedTime: number) => {
    const correctAnswer =
      "i have never let my schooling interfere with my education";
    const processedInput = userInput.toLowerCase().trim();

    // Calculate accuracy
    const totalChars = correctAnswer.length;
    let correctChars = 0;
    for (let i = 0; i < totalChars; i++) {
      if (processedInput[i] === correctAnswer[i]) {
        correctChars++;
      }
    }
    const accuracy = (correctChars / totalChars) * 100;

    // Calculate WPM
    const timeInMinutes = elapsedTime / 60000;
    const wordsTyped = processedInput.split(" ").length;
    const wpm = wordsTyped / timeInMinutes;

    // Score based on WPM and accuracy
    let accScore = 0;
    let wpmScore = 0;

    // Adjust score based on accuracy
    if (accuracy < 50) accScore = -3;
    else if (accuracy < 55) accScore = -2;
    else if (accuracy < 60) accScore = -1;
    else if (accuracy < 65) accScore = 0;
    else if (accuracy < 70) accScore = 1;
    else if (accuracy < 85) accScore = 2;
    else if (accuracy < 90) accScore = 3;

    if (accuracy >= 80) {
      if (wpm < 20) wpmScore = -3;
      else if (wpm < 35) wpmScore = -2;
      else if (wpm < 50) wpmScore = -1;
      else if (wpm < 65) wpmScore = 0;
      else if (wpm < 80) wpmScore = 1;
      else if (wpm < 95) wpmScore = 2;
      else if (wpm < 110) wpmScore = 3;
    }

    let score = Math.floor((accScore + wpmScore) / 2);
    if (score < -3) score = -3;
    else if (score > 3) score = 3;

    return score as ResFormulaAnswer;
  },
};

const dex6: WPMTestQuestion = {
  stat: "dex",
  question:
    "Type the following sentence as fast as you can: 'I have never let my schooling interfere with my education.'",
  type: "wpmTest",
  answer: "I have never let my schooling interfere with my education.",
  resFormula: (userInput: string, elapsedTime: number) => {
    const correctAnswer =
      "i have never let my schooling interfere with my education";
    const processedInput = userInput.toLowerCase().trim();

    // Calculate accuracy
    const totalChars = correctAnswer.length;
    let correctChars = 0;
    for (let i = 0; i < totalChars; i++) {
      if (processedInput[i] === correctAnswer[i]) {
        correctChars++;
      }
    }
    const accuracy = (correctChars / totalChars) * 100;

    // Calculate WPM
    const timeInMinutes = elapsedTime / 60000;
    const wordsTyped = processedInput.split(" ").length;
    const wpm = wordsTyped / timeInMinutes;

    // Score based on WPM and accuracy
    let accScore = 0;
    let wpmScore = 0;

    // Adjust score based on accuracy
    if (accuracy < 50) accScore = -3;
    else if (accuracy < 55) accScore = -2;
    else if (accuracy < 60) accScore = -1;
    else if (accuracy < 65) accScore = 0;
    else if (accuracy < 70) accScore = 1;
    else if (accuracy < 85) accScore = 2;
    else if (accuracy < 90) accScore = 3;

    if (accuracy >= 80) {
      if (wpm < 20) wpmScore = -3;
      else if (wpm < 35) wpmScore = -2;
      else if (wpm < 50) wpmScore = -1;
      else if (wpm < 65) wpmScore = 0;
      else if (wpm < 80) wpmScore = 1;
      else if (wpm < 95) wpmScore = 2;
      else if (wpm < 110) wpmScore = 3;
    }

    let score = Math.floor((accScore + wpmScore) / 2);
    if (score < -3) score = -3;
    else if (score > 3) score = 3;

    return score as ResFormulaAnswer;
  },
};

const dex7: WPMTestQuestion = {
  stat: "dex",
  question:
    "Type the following sentence as fast as you can: 'I have never let my schooling interfere with my education.'",
  type: "wpmTest",
  answer: "I have never let my schooling interfere with my education.",
  resFormula: (userInput: string, elapsedTime: number) => {
    const correctAnswer =
      "i have never let my schooling interfere with my education";
    const processedInput = userInput.toLowerCase().trim();

    // Calculate accuracy
    const totalChars = correctAnswer.length;
    let correctChars = 0;
    for (let i = 0; i < totalChars; i++) {
      if (processedInput[i] === correctAnswer[i]) {
        correctChars++;
      }
    }
    const accuracy = (correctChars / totalChars) * 100;

    // Calculate WPM
    const timeInMinutes = elapsedTime / 60000;
    const wordsTyped = processedInput.split(" ").length;
    const wpm = wordsTyped / timeInMinutes;

    // Score based on WPM and accuracy
    let accScore = 0;
    let wpmScore = 0;

    // Adjust score based on accuracy
    if (accuracy < 50) accScore = -3;
    else if (accuracy < 55) accScore = -2;
    else if (accuracy < 60) accScore = -1;
    else if (accuracy < 65) accScore = 0;
    else if (accuracy < 70) accScore = 1;
    else if (accuracy < 85) accScore = 2;
    else if (accuracy < 90) accScore = 3;

    if (accuracy >= 80) {
      if (wpm < 20) wpmScore = -3;
      else if (wpm < 35) wpmScore = -2;
      else if (wpm < 50) wpmScore = -1;
      else if (wpm < 65) wpmScore = 0;
      else if (wpm < 80) wpmScore = 1;
      else if (wpm < 95) wpmScore = 2;
      else if (wpm < 110) wpmScore = 3;
    }

    let score = Math.floor((accScore + wpmScore) / 2);
    if (score < -3) score = -3;
    else if (score > 3) score = 3;

    return score as ResFormulaAnswer;
  },
};

const strQuestions: Question[] = [str1, str2, str3, str4, str5, str6, str7];
const dexQuestions: Question[] = [dex1, dex2, dex3, dex4, dex5, dex6, dex7];
