import { useMemo, useState } from "react";

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

  function onHandleResult(result: number, stat: StatsTypes) {
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
        <div></div>
        <div>
          <div>Character</div>
          <pre>{JSON.stringify(character, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default CharacterCreateContent;
