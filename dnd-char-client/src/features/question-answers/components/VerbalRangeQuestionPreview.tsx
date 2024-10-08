import { ChangeEvent, useState } from "react";
import { Button } from "~/features/shared/components/ui/button";
import { Input } from "~/features/shared/components/ui/input";

type VerbalRangeQuestionProps = {
  verbalRangeQuestion: VerbalRangeQuestion;
  verbalRangeAnswer: VerbalRangeAnswer;
  onHandleResult: (result: ScoreFormulaResult, stat: StatsTypes) => void;
};

function VerbalRangeQuestionPreview({
  verbalRangeQuestion,
  verbalRangeAnswer,
  onHandleResult,
}: VerbalRangeQuestionProps) {
  const [answer, setAnswer] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);

  function onHandleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value.trim() === "") {
      setError("Please enter a text");
      setAnswer("");
      return;
    }
    setError(undefined);
    setAnswer(value);
  }

  function onSubmitResult() {
    if (answer === undefined) return;
    const result = verbalRangeAnswer.resScoreFormula(answer);
    onHandleResult(result, verbalRangeQuestion.stat);
  }

  function onHandleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onSubmitResult();
    }
  }

  return (
    <div>
      <div>
        <div>{verbalRangeQuestion.question}</div>
        <Input
          type="text"
          name="answer"
          autoFocus
          value={answer}
          onChange={onHandleChange}
          onKeyDown={onHandleKeyDown}
        />
      </div>
      <Button onClick={() => onSubmitResult()}>Submit</Button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

export default VerbalRangeQuestionPreview;
