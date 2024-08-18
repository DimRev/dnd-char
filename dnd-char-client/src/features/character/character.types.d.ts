interface Character {
  name: string;
  race: string;
  class: string;
  level: number;
  hp: number;
  ac: number;
  speed: number;
  stats: {
    [key in Stats]: number;
  };
}

type Stats = "str" | "dex" | "con" | "int" | "wis" | "cha";
type ResFormulaAnswer = -3 | -2 | -1 | 0 | 1 | 2 | 3;

interface Question {
  stat: Stats;
  type: "timedNumeric" | "timedString" | "numericRange" | "verbalRange";
}

export interface TimedNumericQuestion extends Question {
  type: "timedNumeric";
  question: string;
  answer: number;
  resFormula: (answer: number, elapsedTime: number) => ResFormulaAnswer;
}

export interface TimedVerbalQuestion extends Question {
  type: "timedString";
  question: string;
  answer: string;
  resFormula: (answer: string, elapsedTime: number) => ResFormulaAnswer;
}

interface NumericRangeQuestion extends Question {
  type: "numericRange";
  question: string;
  answerRanges: number[];
  resFormula: (answerIdx: number) => number;
}

interface VerbalRangeQuestion extends Question {
  type: "verbalRange";
  question: string;
  answerRanges: string[];
  resFormula: (answerIdx: number) => number;
}
