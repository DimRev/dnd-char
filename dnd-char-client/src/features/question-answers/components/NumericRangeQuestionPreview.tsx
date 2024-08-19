import { ChangeEvent, useState } from "react";
import { Button } from "~/features/shared/components/ui/button";
import { Input } from "~/features/shared/components/ui/input";

type NumericRangeQuestionProps = {
  numericRangeQuestion: NumericRangeQuestion;
  numericRangeAnswer: NumericRangeAnswer;
  onHandleResult: (result: ScoreFormulaResult, stat: StatsTypes) => void;
};

function NumericRangeQuestionPreview({
  numericRangeQuestion,
  numericRangeAnswer,
  onHandleResult,
}: NumericRangeQuestionProps) {
  const [answer, setAnswer] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

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

  function onHandleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onSubmitResult();
    }
  }

  function onSubmitResult() {
    if (answer === undefined) return;
    const result = numericRangeAnswer.resScoreFormula(answer);
    onHandleResult(result, numericRangeQuestion.stat);
  }

  return (
    <div>
      <div>
        <div>{numericRangeQuestion.question}</div>
        <Input
          autoFocus
          type="text"
          name="answer"
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

export default NumericRangeQuestionPreview;
