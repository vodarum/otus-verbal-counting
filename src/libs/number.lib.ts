function generateRandomNumber(rangeOrNumberOfDigits: number): number;
function generateRandomNumber(rangeOrNumberOfDigits: { min: number; max: number; }): number;
function generateRandomNumber(rangeOrNumberOfDigits: any): number { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (typeof rangeOrNumberOfDigits === "number") {
    return Math.trunc(+Math.random().toFixed(rangeOrNumberOfDigits) * 100);
  }

  return Math.floor(Math.random() * (rangeOrNumberOfDigits.max - rangeOrNumberOfDigits.min + 1)) + rangeOrNumberOfDigits.min;
}

export { generateRandomNumber };
