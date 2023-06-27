import { getFormatDate } from "@/libs/date.lib.";
import { getStorage } from "@/services/storage";
import { State } from "@/types";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as baseUseStore } from "vuex";

const key: InjectionKey<Store<State>> = Symbol();

const useStore = () => {
  return baseUseStore(key);
};

const store = createStore<State>({
  state: () => ({
    complexityLevels: {
      exponentiation: [
        { // 1
          base: { min: 2, max: 4, },
          exp: { min: 1, max: 3, },
        },
        { // 2
          base: { min: 4, max: 6, },
          exp: { min: 1, max: 3, },
        },
        { // 3
          base: { min: 6, max: 8, },
          exp: { min: 1, max: 3, },
        },
        { // 4
          base: { min: 8, max: 10, },
          exp: { min: 1, max: 3, },
        },
        { // 5
          base: { min: 2, max: 4, },
          exp: { min: 3, max: 5, },
        },
        { // 6
          base: { min: 4, max: 6, },
          exp: { min: 3, max: 5, },
        },
        { // 7
          base: { min: 6, max: 8, },
          exp: { min: 3, max: 4, },
        },
        { // 8
          base: { min: 8, max: 10, },
          exp: { min: 3, max: 4, },
        },
        { // 9
          base: { min: 10, max: 13, },
          exp: { min: 2, max: 4, },
        },
        { // 10
          base: { min: 13, max: 15, },
          exp: { min: 2, max: 4, },
        },
      ],
      simple: [
        [ // 1
          { min: 1, max: 5, },
          { min: 1, max: 5, },
        ],
        [ // 2
          { min: 1, max: 9, },
          { min: 5, max: 10, },
        ],
        [ // 3
          { min: 10, max: 50, },
          { min: 10, max: 50, },
        ],
        [ // 4
          { min: 10, max: 50, },
          { min: 50, max: 99, },
        ],
        [ // 5
          { min: 10, max: 99, },
          { min: 100, max: 999, },
        ],
        [ // 6
          { min: 100, max: 999, },
          { min: 100, max: 999, },
        ],
        [ // 7
          { min: 10, max: 99, },
          { min: 10, max: 99, },
          { min: 100, max: 999, },
        ],
        [ // 8
          { min: 10, max: 99, },
          { min: 10, max: 499, },
          { min: 100, max: 999, },
        ],
        [ // 9
          { min: 10, max: 499, },
          { min: 100, max: 999, },
          { min: 100, max: 999, },
        ],
        [ // 10
          { min: 100, max: 999, },
          { min: 100, max: 999, },
          { min: 100, max: 999, },
        ],
      ],
      difficult: [
        [ // 1
          { min: 1, max: 5, },
          { min: 1, max: 9, },
        ],
        [ // 2
          { min: 6, max: 9, },
          { min: 1, max: 9, },
        ],
        [ // 3
          { min: 10, max: 50, },
          { min: 1, max: 5, },
        ],
        [ // 4
          { min: 51, max: 99, },
          { min: 1, max: 5, },
        ],
        [ // 5
          { min: 10, max: 99, },
          { min: 6, max: 9, },
        ],
        [ // 6
          { min: 100, max: 499, },
          { min: 2, max: 5, },
        ],
        [ // 7
          { min: 100, max: 499, },
          { min: 6, max: 9, },
        ],
        [ // 8
          { min: 1, max: 9, },
          { min: 10, max: 30, },
          { min: 10, max: 30, },
        ],
        [ // 9
          { min: 5, max: 9, },
          { min: 5, max: 9, },
          { min: 100, max: 500, },
        ],
        [ // 10
          { min: 5, max: 9, },
          { min: 10, max: 99, },
          { min: 50, max: 99, },
        ],
      ],
    },
    settingsLimits: {
      complexity: { min: 1, max: 10, },
      duration: { min: 1, max: 15, },
      mathOperations: [
        { key: "sum", name: "Суммирование", },
        { key: "diff", name: "Разность", },
        { key: "multi", name: "Умножение", },
        { key: "div", name: "Деление", },
        { key: "exp", name: "Возведение в степень", },
      ],
    },
    settings: {
      complexity: 1,
      duration: 1,
      mathOperations: [],
      withNegative: false,
    },
    statistics: {
      trainingDayNumber: 1,
      lastTrainingDate: "2023-06-23",
      lastResult: {
        completed: 0,
        total: 0,
      },
      accuracy: 0,
    },
  }),
  getters: {
    validateSettings: (state: State) => !state.settings.mathOperations.length,
  },
  mutations: {
    setSettings: (state: State, settings: Partial<State["settings"]>) => {
      state.settings = {...state.settings, ...settings};
    },
    setStatistics: (state: State, statistics: Partial<State["statistics"]>) => {
      state.statistics = {...state.statistics, ...statistics};
    },
  },
  actions: {
    initStore: ({ dispatch }) => {
        const vcStorage = getStorage();

        dispatch("saveSettings", vcStorage.settings);
        dispatch("saveStatistics", vcStorage.statistics);
    },
    saveSettings: ({ commit }, settings: Partial<State["settings"]>) => {
      commit("setSettings", settings);
    },
    saveStatistics: ({ commit, state }, statistics: Partial<State["statistics"]>) => {
      const today = getFormatDate(new Date());
      const { trainingDayNumber, lastTrainingDate } = { ...state.statistics, ...statistics };

      commit("setStatistics", today !== lastTrainingDate ? {...statistics, ...{ trainingDayNumber: trainingDayNumber + 1, lastTrainingDate: today }} : statistics);
    },
  },
});

export {key, store, useStore};