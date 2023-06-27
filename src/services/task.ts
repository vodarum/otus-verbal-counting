import { generateRandomNumber } from "@/libs/number.lib";
import { SettingsToTaskParamsType, State, TaskParamsType } from "@/types";

const isNegative = (): boolean => !!generateRandomNumber({ min: 0, max: 1 });

const getNumbers = (complexityLevels: State["complexityLevels"]["simple"], { complexity, withNegative }: SettingsToTaskParamsType): TaskParamsType["numbers"] => {
  let numbers: TaskParamsType["numbers"] = complexityLevels[complexity - 1].map((n) => generateRandomNumber(n));

  if (withNegative) {
    numbers = numbers.map((n) => (isNegative() ? -n : n));
  }

  return numbers;
};

const getSumTaskParams = (complexityLevels: State["complexityLevels"]["simple"], settings: SettingsToTaskParamsType): TaskParamsType => {
  const numbers = getNumbers(complexityLevels, settings);
  const result = numbers.reduce((previousValue: number, currentValue: number) => previousValue + currentValue);

  return {
    numbers: [...numbers, result],
    sign: "+",
  };
};

const getDiffTaskParams = (complexityLevels: State["complexityLevels"]["simple"], settings: SettingsToTaskParamsType): TaskParamsType => {
  const numbers = getNumbers(complexityLevels, settings);
  const result = numbers.reduce((previousValue: number, currentValue: number) => previousValue + currentValue);

  return {
    numbers: [result, ...numbers],
    sign: "-",
  };
};

const getMultiTaskParams = (complexityLevels: State["complexityLevels"]["difficult"], settings: SettingsToTaskParamsType): TaskParamsType => {
  const numbers = getNumbers(complexityLevels, settings);
  const result = numbers.reduce((previousValue: number, currentValue: number) => previousValue * currentValue);

  return {
    numbers: [...numbers, result],
    sign: "*",
  };
};

const getDivTaskParams = (complexityLevels: State["complexityLevels"]["difficult"], settings: SettingsToTaskParamsType): TaskParamsType => {
  const numbers = getNumbers(complexityLevels, settings);
  const result = numbers.reduce((previousValue: number, currentValue: number) => previousValue * currentValue);

  return {
    numbers: [result, ...numbers],
    sign: "/",
  };
};

const getExpTaskParams = (complexityLevels: State["complexityLevels"]["exponentiation"], { complexity, withNegative }: SettingsToTaskParamsType): TaskParamsType => {
  const { base, exp } = complexityLevels[complexity - 1];
  const [baseValue, expValue] = [withNegative && isNegative() ? -generateRandomNumber(base) : generateRandomNumber(base), generateRandomNumber(exp)];
  const result = baseValue ** expValue;

  return {
    numbers: [baseValue, expValue, result],
    sign: "^",
  };
};

const getDefaultTaskParams = (): TaskParamsType => ({ numbers: [], sign: "=" });

export const getTaskParams = ({ complexityLevels, settings }: Pick<State, "complexityLevels" | "settings">): TaskParamsType => {
  const { complexity, mathOperations, withNegative } = settings;
  const randomMathOperations = mathOperations[Math.floor(Math.random() * mathOperations.length)];

  switch (randomMathOperations) {
    case "sum":
      return getSumTaskParams(complexityLevels.simple, { complexity, withNegative, });

    case "diff":
      return getDiffTaskParams(complexityLevels.simple, { complexity, withNegative, });

    case "multi":
      return getMultiTaskParams(complexityLevels.difficult, { complexity, withNegative, });

    case "div":
      return getDivTaskParams(complexityLevels.difficult, { complexity, withNegative, });

    case "exp":
      return getExpTaskParams(complexityLevels.exponentiation, { complexity, withNegative, });

    default:
      return getDefaultTaskParams();
  }
};
