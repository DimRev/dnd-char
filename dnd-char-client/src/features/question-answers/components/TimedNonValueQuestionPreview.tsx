import { useEffect, useMemo, useState } from "react";
import { Button } from "~/features/shared/components/ui/button";

type TimedNonValueQuestionProps = {
  timedNonValueQuestion: TimedNonValueQuestion;
  timedNonValueAnswer: TimedNonValueAnswer;
  onHandleResult: (result: ScoreFormulaResult, stat: StatsTypes) => void;
};

function TimedNonValueQuestionPreview({
  timedNonValueQuestion,
  timedNonValueAnswer,
  onHandleResult,
}: TimedNonValueQuestionProps) {
  const [currTimestamp, setCurrTimestamp] = useState(Date.now());
  const [startTimestamp, setStartTimestamp] = useState(Date.now());

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

  function onSubmitResult() {
    const result = timedNonValueAnswer.resScoreFormula(timeElapsed.actual);
    onHandleResult(result, timedNonValueQuestion.stat);
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
        <h1>{timedNonValueQuestion.question}</h1>
      </div>
      <Button onClick={() => onSubmitResult()}>Submit</Button>
    </div>
  );
}

export default TimedNonValueQuestionPreview;
