interface Question<T extends AnswerTypes> {
  type: QuestionType;
  stat: StatsTypes;
  currAnswer?: T;
}

interface Answer<T extends AnswerTypes> {
  type: AnswerType;
  resScoreFormula: ResTimedScoreFormula<T>;
}

interface QuestionAnswer<T extends SpecificQuestion, U extends SpecificAnswer> {
  type: QuestionAnswerType;
  question: T;
  answer: U;
}

// Union Types for Questions and Answers
type SpecificQuestion =
  | TimedNumericQuestion
  | TimedVerbalQuestion
  | TimedNonValueQuestion
  | NumericRangeQuestion
  | VerbalRangeQuestion;
type SpecificAnswer =
  | TimedNumericAnswer
  | TimedVerbalAnswer
  | TimedNonValueAnswer
  | NumericRangeAnswer
  | VerbalRangeAnswer;

interface TimedNumericQA
  extends QuestionAnswer<TimedNumericQuestion, TimedNumericAnswer> {
  type: "timedNumeric";
}

interface TimedVerbalQA
  extends QuestionAnswer<TimedVerbalQuestion, TimedVerbalAnswer> {
  type: "timedVerbal";
}

interface NumericRangeQA
  extends QuestionAnswer<NumericRangeQuestion, NumericRangeAnswer> {
  type: "numericRange";
}

interface VerbalRangeQA
  extends QuestionAnswer<VerbalRangeQuestion, VerbalRangeAnswer> {
  type: "verbalRange";
}

interface TimedNonValueQA
  extends QuestionAnswer<TimedNonValueQuestion, TimedNonValueAnswer> {
  type: "timedNonValue";
}

type QuestionAnswerType =
  | "timedNumeric"
  | "timedVerbal"
  | "timedNonValue"
  | "numericRange"
  | "verbalRange";

// Define the ScoreFormulaResult type
type ScoreFormulaResult = -3 | -2 | -1 | 0 | 1 | 2 | 3;

// Define the generic Answer Types
type AnswerTypes = number | string | number[] | string[] | undefined;

// Define ResScoreFormula type
interface ResTimedScoreFormula<T extends AnswerTypes> {
  (elapsedTime: number, answer?: T): ScoreFormulaResult;
}
interface ResRangeScoreFormula<T extends AnswerTypes> {
  (answer: T): ScoreFormulaResult;
}

// Define the base Question and Answer Interfaces

// Extend for Specific Question and Answer Types

interface TimedNumericQuestion extends Question<number> {
  type: "timedNumeric";
  question: string;
  currAnswer?: number;
}

interface TimedNumericAnswer extends Answer<number> {
  type: "timedNumeric";
  resScoreFormula: ResTimedScoreFormula<number>;
}

interface TimedVerbalQuestion extends Question<string> {
  type: "timedVerbal";
  question: string;
  currAnswer?: string;
}

interface TimedVerbalAnswer extends Answer<string> {
  type: "timedVerbal";
  resScoreFormula: ResTimedScoreFormula<string>;
}

interface TimedNonValueQuestion extends Question<number> {
  type: "timedNonValue";
  question: string;
  currAnswer?: number;
}

interface TimedNonValueAnswer extends Answer<undefined> {
  type: "timedNonValue";
  resScoreFormula: ResTimedScoreFormula<undefined>;
}

interface NumericRangeQuestion extends Question<number[]> {
  type: "numericRange";
  question: string;
  currAnswer?: number[];
}

interface NumericRangeAnswer extends Answer<number[]> {
  type: "numericRange";
  resScoreFormula: ResRangeScoreFormula<number>;
}

interface VerbalRangeQuestion extends Question<string[]> {
  type: "verbalRange";
  question: string;
  currAnswer?: string[];
}

interface VerbalRangeAnswer extends Answer<string[]> {
  type: "verbalRange";
  resScoreFormula: ResRangeScoreFormula<string>;
}
