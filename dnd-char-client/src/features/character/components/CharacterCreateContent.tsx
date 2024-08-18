import { useState } from "react";
import TimedQuestion from "~/features/character/components/TimedQuestion";
import {
  Stats,
  TimedNumericQuestion,
} from "~/features/character/character.types";

function CharacterCreateContent() {
  const [step, setStep] = useState(0);

  const timeNumericQuestion: TimedNumericQuestion = {
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

  function onCalculateResult(result: number, stat: Stats) {
    console.log(result, stat);
    setStep((prev) => prev + 1);
  }

  return (
    <div>
      {step === 0 && (
        <TimedQuestion
          onCalculateResult={onCalculateResult}
          timedNumOrStrQuestion={timeNumericQuestion}
        />
      )}
    </div>
  );
}

export default CharacterCreateContent;
