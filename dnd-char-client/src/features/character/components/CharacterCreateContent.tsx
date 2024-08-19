import { useEffect, useMemo, useState } from "react";

import QuestionDynamicPreview from "./QuestionDynamicPreview";

const timedNumericQuestion: TimedNumericQuestion = {
  stat: "int",
  question: "Calculate (1 + 2) * 3 + 1:",
  type: "timedNumeric",
  answer: 12,
  resFormula: (answer: number, elapsedTime: number) => {
    if (answer != 12) return -3;
    if (elapsedTime > 60000) return -2;
    if (elapsedTime > 40000) return -1;
    if (elapsedTime > 20000) return 0;
    if (elapsedTime > 10000) return 1;
    if (elapsedTime > 5000) return 2;
    return 3;
  },
};

const timedVerbalQuestion: TimedVerbalQuestion = {
  stat: "wis",
  question: "What is the capital of France?",
  type: "timedVerbal",
  answer: "Paris",
  resFormula: (answer: string, elapsedTime: number) => {
    if (answer.toLocaleLowerCase().trim() !== "paris") return -3;
    if (elapsedTime > 60000) return -2;
    if (elapsedTime > 40000) return -1;
    if (elapsedTime > 20000) return 0;
    if (elapsedTime > 10000) return 1;
    if (elapsedTime > 5000) return 2;
    return 3;
  },
};

const numericRangeQuestion: NumericRangeQuestion = {
  stat: "str",
  question:
    "What's the maximum weight you could lift above your head with one hand (kg)?",
  type: "numericRange",
  answer: [1, 5, 10, 20, 30, 50],
  resFormula: (answer: number) => {
    if (answer < 1) return -3;
    if (answer < 5) return -2;
    if (answer < 10) return -1;
    if (answer < 20) return 0;
    if (answer < 30) return 1;
    if (answer < 50) return 2;
    return 3;
  },
};

const verbalRangeQuestion: VerbalRangeQuestion = {
  stat: "wis",
  question:
    "How do you generally react when someone offers you unsolicited advice? (Please answer with one word)",
  type: "verbalRange",
  answer: ["Ignore", "Consider", "Accept", "Seek"],
  resFormula: (answer: string) => {
    const processedAnswer = answer.toLowerCase().trim();

    switch (processedAnswer) {
      case "ignore":
      case "dismiss":
      case "neglect":
        return -3;
      case "avoid":
      case "shrug":
      case "reject":
        return -2;
      case "hesitate":
      case "delay":
        return -1;
      case "consider":
      case "ponder":
      case "weigh":
        return 0;
      case "accept":
      case "take":
      case "agree":
        return 1;
      case "explore":
      case "investigate":
      case "search":
        return 2;
      case "seek":
      case "ask":
      case "inquire":
        return 3;
      default:
        return 0;
    }
  },
};

const questions: Question[] = [
  timedNumericQuestion,
  timedVerbalQuestion,
  numericRangeQuestion,
  verbalRangeQuestion,
];

function CharacterCreateContent() {
  const [step, setStep] = useState(0);
  const [modifiers, setModifiers] = useState<Record<Stats, number[]>>({
    str: [],
    dex: [],
    con: [],
    int: [],
    wis: [],
    cha: [],
  });

  const character = useMemo(() => {
    const base_char: Character = {
      name: "Test",
      race: "Human",
      class: "Fighter",
      level: 1,
      ac: 10,
      speed: 10,
      hp: 10,
      stats: {
        str: 10,
        dex: 10,
        int: 10,
        con: 10,
        wis: 10,
        cha: 10,
      },
    };
    if (modifiers === undefined) return base_char;

    base_char.stats.str =
      modifiers.str.length > 0
        ? 10 +
          Math.floor(
            modifiers.str.reduce((acc, val) => acc + val, 0) /
              modifiers.str.length,
          )
        : 10;

    base_char.stats.dex =
      modifiers.dex.length > 0
        ? 10 +
          Math.floor(
            modifiers.dex.reduce((acc, val) => acc + val, 0) /
              modifiers.dex.length,
          )
        : 10;

    base_char.stats.int =
      modifiers.int.length > 0
        ? 10 +
          Math.floor(
            modifiers.int.reduce((acc, val) => acc + val, 0) /
              modifiers.int.length,
          )
        : 10;

    base_char.stats.con =
      modifiers.con.length > 0
        ? 10 +
          Math.floor(
            modifiers.con.reduce((acc, val) => acc + val, 0) /
              modifiers.con.length,
          )
        : 10;

    base_char.stats.wis =
      modifiers.wis.length > 0
        ? 10 +
          Math.floor(
            modifiers.wis.reduce((acc, val) => acc + val, 0) /
              modifiers.wis.length,
          )
        : 10;

    base_char.stats.cha =
      modifiers.cha.length > 0
        ? 10 +
          Math.floor(
            modifiers.cha.reduce((acc, val) => acc + val, 0) /
              modifiers.cha.length,
          )
        : 10;

    return base_char;
  }, [modifiers]);

  function onHandleResult(result: number, stat: Stats) {
    setModifiers((prev) => {
      const newModifiers = { ...prev };
      newModifiers[stat] = [...(newModifiers[stat] ?? []), result];
      return newModifiers;
    });
    setStep((prev) => prev + 1);
  }

  return (
    <div>
      <h1>Create Character</h1>
      <div className="flex gap-4">
        <div>
          {step === 0 && (
            <QuestionDynamicPreview
              question={timedNumericQuestion}
              onHandleResult={onHandleResult}
            />
          )}
          {step === 1 && (
            <QuestionDynamicPreview
              question={timedVerbalQuestion}
              onHandleResult={onHandleResult}
            />
          )}
          {step === 2 && (
            <QuestionDynamicPreview
              question={numericRangeQuestion}
              onHandleResult={onHandleResult}
            />
          )}
          {step === 3 && (
            <QuestionDynamicPreview
              question={verbalRangeQuestion}
              onHandleResult={onHandleResult}
            />
          )}
        </div>
        <div>
          <div>Character</div>
          <pre>{JSON.stringify(character, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default CharacterCreateContent;
