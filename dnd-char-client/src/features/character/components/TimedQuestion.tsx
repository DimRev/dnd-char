import { useEffect, useMemo, useState } from "react";
import {
  Stats,
  TimedNumericQuestion,
  TimedVerbalQuestion,
} from "~/features/character/character.types";
import { Button } from "~/features/shared/components/ui/button";
import { Input } from "~/features/shared/components/ui/input";

type Props = {
  timedNumOrStrQuestion: TimedNumericQuestion | TimedVerbalQuestion;
  onCalculateResult: (result: number, stat: Stats) => void;
};

function TimedQuestion({ timedNumOrStrQuestion, onCalculateResult }: Props) {
  const [currTimestamp, setCurrTimestamp] = useState(Date.now());
  const [startTimestamp, setStartTimestamp] = useState(Date.now());
  const [answer, setAnswer] = useState<number | string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const timeElapsed = useMemo(() => {
    const timeDiff = currTimestamp - startTimestamp;
    const minutes = Math.floor(timeDiff / 60000);
    const seconds = Math.floor((timeDiff % 60000) / 1000);
    return {
      actual: timeDiff,
      formatted: `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
    };
  }, [currTimestamp, startTimestamp]);

  function onSubmitResult() {
    console.log("onSubmitResult", answer, timeElapsed.actual);
    let result: number | string | undefined = undefined;
    if (
      timedNumOrStrQuestion.type === "timedNumeric" &&
      typeof answer === "number" &&
      !Number.isNaN(answer)
    ) {
      result = timedNumOrStrQuestion.resFormula(answer, timeElapsed.actual);
    } else if (
      timedNumOrStrQuestion.type === "timedString" &&
      typeof answer === "string"
    ) {
      result = timedNumOrStrQuestion.resFormula(answer, timeElapsed.actual);
    } else if (
      typeof answer === "string" ||
      (typeof answer === "number" && Number.isNaN(answer))
    ) {
      setError("Please enter a number");
    } else if (typeof answer === "number") {
      setError("Please enter a number");
    } else if (answer === undefined) {
      setError("Please enter an answer");
    }
    if (result !== undefined) {
      onCalculateResult(result, timedNumOrStrQuestion.stat);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTimestamp(Date.now());
    }, 377);
    setStartTimestamp(Date.now());
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>{timeElapsed.formatted}</div>
      <div>
        {timedNumOrStrQuestion.type === "timedNumeric" ? (
          <>
            <h1>{timedNumOrStrQuestion.question}</h1>
            <Input
              type="text"
              name="answer"
              onChange={(e) => setAnswer(Number(e.target.value))}
            />
          </>
        ) : timedNumOrStrQuestion.type === "timedString" ? (
          <>
            <h1>{timedNumOrStrQuestion.question}</h1>
            <Input
              type="text"
              name="answer"
              onChange={(e) => setAnswer(e.target.value)}
            />
          </>
        ) : null}
      </div>
      <Button onClick={() => onSubmitResult()}>Submit</Button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

export default TimedQuestion;
