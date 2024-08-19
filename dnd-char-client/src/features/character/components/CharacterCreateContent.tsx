import { useEffect, useMemo, useRef, useState } from "react";
import QuestionDynamicPreview from "~/features/question-answers/components/QuestionDynamicPreview";

import { strQAs, dexQAs, conQAs } from "~/features/question-answers/qa.mock";
import { cn } from "~/lib/util";

function CharacterCreateContent() {
  const [step, setStep] = useState(0);
  const [modifiers, setModifiers] = useState<Record<StatsTypes, number[]>>({
    str: [],
    dex: [],
    con: [],
    int: [],
    wis: [],
    cha: [],
  });
  const [qa, setQA] = useState<QuestionAnswer[]>([]);
  const [lastModified, setLastModified] = useState<
    [StatsTypes, number] | undefined
  >(undefined);

  const lastModifiedTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    setQA(() => {
      const shuffledQAs = [...strQAs, ...dexQAs, ...conQAs];
      return shuffledQAs.sort(() => Math.random() - 0.5);
    });
  }, []);

  useEffect(() => {
    if (lastModifiedTimeoutRef.current) {
      clearTimeout(lastModifiedTimeoutRef.current);
      lastModifiedTimeoutRef.current = null;
    }
    if (lastModified) {
      lastModifiedTimeoutRef.current = setTimeout(() => {
        setLastModified(undefined);
      }, 1500);
    }
  }, [lastModified]);

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
        ? 10 + Math.floor(modifiers.str.reduce((acc, val) => acc + val, 0))
        : 10;

    base_char.stats.dex =
      modifiers.dex.length > 0
        ? 10 + Math.floor(modifiers.dex.reduce((acc, val) => acc + val, 0))
        : 10;

    base_char.stats.int =
      modifiers.int.length > 0
        ? 10 + Math.floor(modifiers.int.reduce((acc, val) => acc + val, 0))
        : 10;

    base_char.stats.con =
      modifiers.con.length > 0
        ? 10 + Math.floor(modifiers.con.reduce((acc, val) => acc + val, 0))
        : 10;

    base_char.stats.wis =
      modifiers.wis.length > 0
        ? 10 + Math.floor(modifiers.wis.reduce((acc, val) => acc + val, 0))
        : 10;

    base_char.stats.cha =
      modifiers.cha.length > 0
        ? 10 + Math.floor(modifiers.cha.reduce((acc, val) => acc + val, 0))
        : 10;

    return base_char;
  }, [modifiers]);

  function onHandleResult(result: number, stat: StatsTypes) {
    setModifiers((prev) => {
      const newModifiers = { ...prev };
      newModifiers[stat] = [...(newModifiers[stat] ?? []), result];
      return newModifiers;
    });
    setLastModified([stat, result]);
    setStep((prev) => prev + 1);
  }

  return (
    <div>
      <h1>Create Character</h1>
      <div className="flex gap-4">
        <div>
          <QuestionDynamicPreview
            qa={qa[step]}
            onHandleResult={onHandleResult}
          />
        </div>
        <div className="relative">
          <div>Character</div>
          <pre>{JSON.stringify(character, null, 2)}</pre>
          {lastModified && (
            <div
              className={cn(
                "absolute right-1/2 top-1/2 animate-bounce rounded-md bg-red-500 px-2 py-1 text-white",
                lastModified[1] > 0
                  ? "bg-green-500"
                  : lastModified[1] === 0
                    ? "bg-yellow-500"
                    : "bg-red-500",
              )}
            >
              <div>
                Str: +3
                {/* {lastModified[0]}: {lastModified[1]} */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterCreateContent;
