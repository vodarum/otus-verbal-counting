type RangeType = {
  min: number;
  max: number;
};

type ComplexityLevelsType = {
  exponentiation: Array<{
    base: RangeType;
    exp: RangeType;
  }>;
  simple: Array<Array<RangeType>>;
  difficult: Array<Array<RangeType>>;
};

type SettingsLimitsType = {
  complexity: RangeType;
  duration: RangeType;
  mathOperations: Array<{
    key: string;
    name: string;
  }>;
};

type MathOperationsSettingsType = "sum" | "diff" | "multi" | "div" | "exp";

type SettingsType = {
  complexity: number;
  duration: number;
  mathOperations: Array<MathOperationsSettingsType>;
  withNegative: boolean;
};

type SettingsToTaskParamsType = Pick<SettingsType, "complexity" | "withNegative">;

type StatisticsType = {
  lastTrainingDate: string;
  trainingDayNumber: number;
  lastResult: {
    completed: number;
    total: number;
  };
  accuracy: number;
};

type State = {
  complexityLevels: ComplexityLevelsType;
  settingsLimits: SettingsLimitsType;
  settings: SettingsType;
  statistics: StatisticsType;
};

type StorageType = Pick<State, "settings" | "statistics">;

type SignType = "+" | "-" | "*" | "/" | "^" | "=";

type TaskParamsType = {
  numbers: Array<number>;
  sign: SignType;
};

export { SettingsType, SettingsToTaskParamsType, State, StorageType, TaskParamsType };
