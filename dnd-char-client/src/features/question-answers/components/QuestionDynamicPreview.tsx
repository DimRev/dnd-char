import NumericRangeQuestionPreview from "~/features/question-answers/components/NumericRangeQuestionPreview";
import TimedNonValueQuestionPreview from "~/features/question-answers/components/TimedNonValueQuestionPreview";
import TimedNumericQuestionPreview from "~/features/question-answers/components/TimedNumericQuestionPreview";
import TimedVerbalQuestionPreview from "~/features/question-answers/components/TimedVariableQuestionPreview";
import VerbalRangeQuestionPreview from "~/features/question-answers/components/VerbalRangeQuestionPreview";

type Props = {
  qa: QuestionAnswer<SpecificQuestion, SpecificAnswer>;
  onHandleResult: (result: ScoreFormulaResult, stat: StatsTypes) => void;
};

function QuestionDynamicPreview({ qa, onHandleResult }: Props) {
  switch (qa.type) {
    case "timedNumeric":
      const timedNumericQuestion = qa.question as TimedNumericQuestion;
      const timedNumericAnswer = qa.answer as TimedNumericAnswer;
      return (
        <TimedNumericQuestionPreview
          onHandleResult={onHandleResult}
          timedNumericQuestion={timedNumericQuestion}
          timedNumericAnswer={timedNumericAnswer}
        />
      );
    case "timedVerbal":
      const timedVerbalQuestion = qa.question as TimedVerbalQuestion;
      const timedVerbalAnswer = qa.answer as TimedVerbalAnswer;
      return (
        <TimedVerbalQuestionPreview
          onHandleResult={onHandleResult}
          timedVerbalQuestion={timedVerbalQuestion}
          timedVerbalAnswer={timedVerbalAnswer}
        />
      );
    case "timedNonValue":
      const timedNonValueQuestion = qa.question as TimedNonValueQuestion;
      const timedNonValueAnswer = qa.answer as TimedNonValueAnswer;
      return (
        <TimedNonValueQuestionPreview
          onHandleResult={onHandleResult}
          timedNonValueQuestion={timedNonValueQuestion}
          timedNonValueAnswer={timedNonValueAnswer}
        />
      );
    case "numericRange":
      const numericRangeQuestion = qa.question as NumericRangeQuestion;
      const numericRangeAnswer = qa.answer as NumericRangeAnswer;
      return (
        <NumericRangeQuestionPreview
          onHandleResult={onHandleResult}
          numericRangeQuestion={numericRangeQuestion}
          numericRangeAnswer={numericRangeAnswer}
        />
      );
    case "verbalRange":
      const verbalRangeQuestion = qa.question as VerbalRangeQuestion;
      const verbalRangeAnswer = qa.answer as VerbalRangeAnswer;
      return (
        <VerbalRangeQuestionPreview
          onHandleResult={onHandleResult}
          verbalRangeQuestion={verbalRangeQuestion}
          verbalRangeAnswer={verbalRangeAnswer}
        />
      );
  }
}

export default QuestionDynamicPreview;
