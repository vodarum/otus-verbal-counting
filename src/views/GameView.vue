<template>
  <div class="game">
    <div class="game__header">
      <q-btn color="red-5" glossy icon="close" label="Отмена" @click="$router.replace({ path: '/' })" />

      <GameTimer :duration="duration" @finish-timer="finishGame" />
    </div>

    <template v-if="gameOver">
      <div class="game__over">
        <span>Игра окончена!</span>
        <q-btn class="game__refresh" color="secondary" label="Заново" @click="$router.go(0)" />
      </div>
    </template>

    <template v-else>
      <GameField class="game__field"
        :class="{ 'bg-green-12': gameFieldCheck.isCorrect, 'bg-deep-orange-12': gameFieldCheck.isIncorrect, }"
        v-bind="gameField" />

      <div class="game__keyboard keyboard">
        <div class="keyboard__row keyboard__row_special">
          <q-btn color="secondary" icon="backspace" @click="remove" />
          <q-btn color="secondary" icon="horizontal_rule" @click="pressKey('-')" />
          <q-btn color="green-5" icon="check" @click="accept" />
        </div>

        <div class="keyboard__row keyboard__row_number">
          <q-btn v-for="i in 9" :key="i" color="secondary" :label="i" @click="pressKey(i)" />
          <q-btn color="secondary" :label="0" @click="pressKey(0)" />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.game {
  padding: 20px;
}

.game__header {
  display: flex;
  justify-content: space-between;
}

.game__field {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  gap: 6px;
  border-radius: 6px;
}

.game__over {
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  color: #ef5350;
}

.game__refresh {
  width: fit-content;
}

.keyboard {
  max-width: 400px;
  margin: 0 auto;
}

.keyboard__row {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.keyboard__row_number {
  margin-top: 6px;
  flex-wrap: wrap;
}

.keyboard__row>* {
  flex: 0 1 31%;
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from "@/store";
import GameTimer from "@/components/GameTimer.vue";
import GameField from "@/components/GameField.vue";
import { getTaskParams } from "@/services/task";
import { generateRandomNumber } from "@/libs/number.lib";
import router from "@/router";
import { setStorage } from "@/services/storage";

export default defineComponent({
  name: "GameView",
  components: {
    GameTimer,
    GameField,
  },
  setup: () => {
    const { state, getters, dispatch } = useStore();

    if (getters.validateSettings) {
      router.replace({ path: "/" });
    }

    const { complexityLevels, settings } = state;
    const gameOver = ref(false);
    const gameField = reactive({ content: "", fakeInput: "" });
    const gameFieldCheck = reactive({ isCorrect: false, isIncorrect: false });
    const statistics = { correct: 0, incorrect: 0 };

    let comparisonValue: number;

    const compare = (): boolean => +gameField.fakeInput === comparisonValue;

    const pressKey = (key: number | "-"): void => {
      if (key === "-") {
        gameField.fakeInput = gameField.fakeInput[0] === "-" ? gameField.fakeInput.slice(1) : `-${gameField.fakeInput}`;
      } else {
        gameField.fakeInput += key;
      }
    };

    const remove = (): void => {
      gameField.fakeInput = gameField.fakeInput.slice(0, -1);
    };

    const accept = (): void => {
      if (compare()) {
        statistics.correct++;
        toggleCheckStatus("isCorrect").then(() => nextTask());
      } else {
        statistics.incorrect++;
        toggleCheckStatus("isIncorrect").then(() => nextTask());
      }
    };

    const toggleCheckStatus = (k: keyof typeof gameFieldCheck): Promise<void> =>
      new Promise((resolve) => {
        gameFieldCheck[k] = true;

        setTimeout(() => {
          gameFieldCheck[k] = false;
          resolve();
        }, 300);
      });

    const nextTask = (): void => {
      const { numbers, sign } = getTaskParams({ complexityLevels, settings });

      if (numbers.length === 0) {
        return;
      }

      const unknownElementIdx = generateRandomNumber({ min: 0, max: numbers.length - 1, });
      const rawParams: Array<number | "?"> = numbers.map((n: number, idx: number) => (idx === unknownElementIdx ? "?" : n));
      const result = rawParams.pop();

      comparisonValue = numbers[unknownElementIdx];
      gameField.content = rawParams.join(` ${sign} `) + ` = ${result}`;
      gameField.fakeInput = "";
    };

    const finishGame = async (): Promise<void> => {
      const total = statistics.correct + statistics.incorrect;

      await dispatch("saveStatistics", {
        lastResult: {
          completed: statistics.correct,
          total,
        },
        accuracy: ((statistics.correct / total) * 100).toFixed(2),
      });

      setStorage(state);
      gameOver.value = true;
    };

    onMounted(() => {
      nextTask();
    });

    return {
      duration: settings.duration,
      gameOver,
      gameField,
      gameFieldCheck,
      accept,
      remove,
      pressKey,
      finishGame,
    };
  },
});
</script>