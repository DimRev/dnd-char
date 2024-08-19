interface Character {
  name: string;
  race: string;
  class: string;
  level: number;
  hp: number;
  ac: number;
  speed: number;
  stats: {
    [key in StatsTypes]: number;
  };
}

// Define the Stats type
type StatsTypes = "str" | "dex" | "con" | "int" | "wis" | "cha";
