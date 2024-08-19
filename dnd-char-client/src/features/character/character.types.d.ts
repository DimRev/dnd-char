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
type AnswerTypes = number | string | number[] | string[];
type ResFormulaType = (...args: any) => ResFormulaAnswer;
type ResFormulaAnswer = -3 | -2 | -1 | 0 | 1 | 2 | 3;

interface Question {
  stat: Stats;
  type: "timedNumeric" | "timedVerbal" | "numericRange" | "verbalRange";
  answer: AnswerTypes;
  resFormula: ResFormulaType;
}

interface TimedNumericQuestion extends Question {
  type: "timedNumeric";
  question: string;
  answer: number;
  resFormula: (answer: number, elapsedTime: number) => ResFormulaAnswer;
}

interface TimedVerbalQuestion extends Question {
  type: "timedVerbal";
  question: string;
  answer: string;
  resFormula: (answer: string, elapsedTime: number) => ResFormulaAnswer;
}

interface NumericRangeQuestion extends Question {
  type: "numericRange";
  question: string;
  answerRanges: number[];
  resFormula: (answer: number) => ResFormulaAnswer;
}

interface VerbalRangeQuestion extends Question {
  type: "verbalRange";
  question: string;
  answerRanges: string[];
  resFormula: (answer: string) => ResFormulaAnswer;
}
