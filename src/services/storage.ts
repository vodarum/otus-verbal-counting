import { getFormatDate } from "@/libs/date.lib.";
import { StorageType } from "@/types";

const STORAGE_NAME = "verbalCounting";

const getInitStorage = (): StorageType => ({
  settings: {
    complexity: 1,
    duration: 1,
    mathOperations: [],
    withNegative: false,
  },
  statistics: {
    trainingDayNumber: 1,
    lastTrainingDate: getFormatDate(new Date()),
    lastResult: {
      completed: 0,
      total: 0,
    },
    accuracy: 0,
  },
});

const getStorage = (): StorageType => {
  const verbalCounting = localStorage.getItem(STORAGE_NAME);

  return verbalCounting ? JSON.parse(verbalCounting) : getInitStorage();
};

const setStorage = ({ settings, statistics }: StorageType): void => {
  localStorage.setItem(STORAGE_NAME, JSON.stringify({ settings, statistics }));
};

export { getStorage, setStorage };
