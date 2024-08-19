import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Button } from "~/features/shared/components/ui/button";
import { Input } from "~/features/shared/components/ui/input";

type TimedVerbalQuestionProps = {
  timedVerbalQuestion: TimedVerbalQuestion;
  timedVerbalAnswer: TimedVerbalAnswer;
  onHandleResult: (result: ScoreFormulaResult, stat: StatsTypes) => void;
};

function TimedVerbalQuestionPreview({
  timedVerbalQuestion,
  timedVerbalAnswer,
  onHandleResult,
}: TimedVerbalQuestionProps) {
  const [currTimestamp, setCurrTimestamp] = useState(Date.now());
  const [startTimestamp, setStartTimestamp] = useState(Date.now());
  const [answer, setAnswer] = useState<string | undefined>(undefined);
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
    const value = e.target.value;
    if (value === undefined || value === "") {
      setError("Please enter an answer");
      setAnswer(undefined);
      return;
    }
    setAnswer(value);
  }

  function onSubmitResult() {
    if (answer === undefined) return;
    const result = timedVerbalAnswer.resScoreFormula(
      timeElapsed.actual,
      answer,
    );
    onHandleResult(result, timedVerbalQuestion.stat);
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
        <h1>{timedVerbalQuestion.question}</h1>
        <Input type="text" name="answer" onChange={onHandleChange} />
      </div>
      <Button onClick={() => onSubmitResult()}>Submit</Button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

export default TimedVerbalQuestionPreview;
