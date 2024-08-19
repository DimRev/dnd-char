import { useState } from "react";

import QuestionDynamicPreview from "./QuestionDynamicPreview";

function CharacterCreateContent() {
  const [step, setStep] = useState(0);

  const timedNumericQuestion: TimedNumericQuestion = {
    stat: "int",
    question: "Calculate (1 + 2) * 3 + 1:",
    type: "timedNumeric",
    answer: 12,
    resFormula: (answer: number, elapsedTime: number) => {
      if (answer != 12) return -3;
      if (elapsedTime > 60000) return -2;
      if (elapsedTime > 40000) return -1;
      if (elapsedTime > 20000) return 0;
      if (elapsedTime > 10000) return 1;
      if (elapsedTime > 5000) return 2;
      return 3;
    },
  };

  const timedVerbalQuestion: TimedVerbalQuestion = {
    stat: "wis",
    question: "What is the capital of France?",
    type: "timedVerbal",
    answer: "Paris",
    resFormula: (answer: string, elapsedTime: number) => {
      if (answer.toLocaleLowerCase().trim() !== "paris") return -3;
      if (elapsedTime > 60000) return -2;
      if (elapsedTime > 40000) return -1;
      if (elapsedTime > 20000) return 0;
      if (elapsedTime > 10000) return 1;
      if (elapsedTime > 5000) return 2;
      return 3;
    },
  };

  const numericRangeQuestion: NumericRangeQuestion = {
    stat: "str",
    question:
      "What's the maximum weight you could lift above your head with one hand (kg)?",
    type: "numericRange",
    answerRanges: [1, 5, 10, 20, 30, 50],
    resFormula: (answer: number) => {
      return -3;
    },
  };

  const verbalRangeQuestion: VerbalRangeQuestion = {
    stat: "wis",
    question: "What is the average of the following words?",
    type: "verbalRange",
    answerRanges: ["one", "two", "three", "four", "five"],
    resFormula: (answer: string) => {
      return;
    },
  };

  function onHandleResult(result: number, stat: Stats) {
    console.log(result, stat);
    setStep((prev) => prev + 1);
  }

  return (
    <div>
      <h1>Create Character</h1>
      {step === 0 && (
        <QuestionDynamicPreview
          question={timedNumericQuestion}
          onHandleResult={onHandleResult}
        />
      )}
      {step === 1 && (
        <QuestionDynamicPreview
          question={timedVerbalQuestion}
          onHandleResult={onHandleResult}
        />
      )}
      {step === 2 && (
        <QuestionDynamicPreview
          question={numericRangeQuestion}
          onHandleResult={onHandleResult}
        />
      )}
      {step === 3 && (
        <QuestionDynamicPreview
          question={verbalRangeQuestion}
          onHandleResult={onHandleResult}
        />
      )}
    </div>
  );
}

export default CharacterCreateContent;
