import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Button } from "~/features/shared/components/ui/button";
import { Input } from "~/features/shared/components/ui/input";

type Props = {
  question: Question;
  onHandleResult: (result: ResFormulaAnswer, stat: Stats) => void;
};

function QuestionDynamicPreview({ question, onHandleResult }: Props) {
  switch (question.type) {
    case "timedNumeric":
      const timedNumericQuestion = question as TimedNumericQuestion;
      return (
        <TimedNumericQuestionPreview
          onHandleResult={onHandleResult}
          timedNumericQuestion={timedNumericQuestion}
        />
      );
    case "timedVerbal":
      const timedVerbalQuestion = question as TimedVerbalQuestion;
      return (
        <TimedVerbalQuestionPreview
          onHandleResult={onHandleResult}
          timedVerbalQuestion={timedVerbalQuestion}
        />
      );
    case "numericRange":
      const numericRangeQuestion = question as NumericRangeQuestion;
      return (
        <NumericRangeQuestionPreview
          onHandleResult={onHandleResult}
          numericRangeQuestion={numericRangeQuestion}
        />
      );
    case "verbalRange":
      const verbalRangeQuestion = question as VerbalRangeQuestion;
      return (
        <VerbalRangeQuestionPreview
          onHandleResult={onHandleResult}
          verbalRangeQuestion={verbalRangeQuestion}
        />
      );
  }
}

type TimedNumericQuestionProps = {
  timedNumericQuestion: TimedNumericQuestion;
  onHandleResult: (result: ResFormulaAnswer, stat: Stats) => void;
};
function TimedNumericQuestionPreview({
  timedNumericQuestion,
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

  function onSubmitResult() {
    if (answer === undefined) return;
    const result = timedNumericQuestion.resFormula(answer, timeElapsed.actual);
    onHandleResult(result, timedNumericQuestion.stat);
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
        <h1>{timedNumericQuestion.question}</h1>
        <Input type="text" name="answer" onChange={onHandleChange} />
      </div>
      <Button onClick={() => onSubmitResult()}>Submit</Button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

type TimedVerbalQuestionProps = {
  timedVerbalQuestion: TimedVerbalQuestion;
  onHandleResult: (result: ResFormulaAnswer, stat: Stats) => void;
};

function TimedVerbalQuestionPreview({
  timedVerbalQuestion,
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
    const result = timedVerbalQuestion.resFormula(answer, timeElapsed.actual);
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

type NumericRangeQuestionProps = {
  numericRangeQuestion: NumericRangeQuestion;
  onHandleResult: (result: ResFormulaAnswer, stat: Stats) => void;
};

function NumericRangeQuestionPreview({
  numericRangeQuestion,
  onHandleResult,
}: NumericRangeQuestionProps) {
  const [answerIdx, setAnswerIdx] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  function onHandleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) {
      setError("Please enter a number");
      setAnswerIdx(undefined);
      return;
    }
    setError(undefined);
    setAnswerIdx(value);
  }

  function onSubmitResult() {
    if (answerIdx === undefined) return;
    const result = numericRangeQuestion.resFormula(answerIdx);
    onHandleResult(result, numericRangeQuestion.stat);
  }

  return (
    <div>
      <div>
        <div>{numericRangeQuestion.question}</div>
        <Input type="text" name="answer" onChange={onHandleChange} />
      </div>
      <Button onClick={() => onSubmitResult()}>Submit</Button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

type VerbalRangeQuestionProps = {
  verbalRangeQuestion: VerbalRangeQuestion;
  onHandleResult: (result: ResFormulaAnswer, stat: Stats) => void;
};

function VerbalRangeQuestionPreview({
  verbalRangeQuestion,
  onHandleResult,
}: VerbalRangeQuestionProps) {
  return <div>verbalRange</div>;
}

export default QuestionDynamicPreview;
