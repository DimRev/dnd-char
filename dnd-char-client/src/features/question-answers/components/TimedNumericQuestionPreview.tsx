import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Button } from "~/features/shared/components/ui/button";
import { Input } from "~/features/shared/components/ui/input";

type TimedNumericQuestionProps = {
  timedNumericQuestion: TimedNumericQuestion;
  timedNumericAnswer: TimedNumericAnswer;
  onHandleResult: (result: ScoreFormulaResult, stat: StatsTypes) => void;
};
function TimedNumericQuestionPreview({
  timedNumericQuestion,
  timedNumericAnswer,
  onHandleResult,
}: TimedNumericQuestionProps) {
  const [currTimestamp, setCurrTimestamp] = useState(Date.now());
  const [startTimestamp, setStartTimestamp] = useState(Date.now());
  const [answer, setAnswer] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const timeElapsed = useMemo(() => {
    const timeDiff = currTimestamp - startTimestamp;
    const minutes = Math.floor(timeDiff / 60000);
    const seconds = Math.floor((timeDiff % 60000) / 1000);
    return {
      actual: timeDiff,
      formatted:
        timeDiff < 1000
          ? "00:00"
          : `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
    };
  }, [currTimestamp, startTimestamp]);

  function onHandleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) {
      setError("Please enter a number");
      setAnswer(undefined);
      return;
    }
    setError(undefined);
    setAnswer(value);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTimestamp(Date.now());
    }, 377);
    setStartTimestamp(Date.now());
    return () => clearInterval(interval);
  }, []);

  function onSubmitResult() {
    if (answer === undefined) return;
    const result = timedNumericAnswer.resScoreFormula(
      timeElapsed.actual,
      answer,
    );
    onHandleResult(result, timedNumericQuestion.stat);
  }

  function onHandleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onSubmitResult();
    }
  }

  return (
    <div>
      <div>{timeElapsed.formatted}</div>
      <div>
        <h1>{timedNumericQuestion.question}</h1>
        <Input
          type="text"
          name="answer"
          autoFocus
          value={`${answer ? answer : ""}`}
          onChange={onHandleChange}
          onKeyDown={onHandleKeyDown}
        />
      </div>
      <Button onClick={() => onSubmitResult()}>Submit</Button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

export default TimedNumericQuestionPreview;
