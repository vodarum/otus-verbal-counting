<template>
  <div class="statistics">
    <p class="statistics__title">Статистика</p>

    <p class="statistics__text">
      Добро пожаловать на {{ trainingDayNumber }} тренировочный день!
    </p>
    <p class="statistics__text">
      Ваш последний результат: решено {{ lastResult.completed }} из
      {{ lastResult.total }}.
    </p>
    <p class="statistics__text">Общая точность: {{ accuracy }}%.</p>
  </div>
</template>

<style scoped>
.statistics__title {
  font-size: 24px;
}

.statistics__text {
  margin-bottom: 0;
}
</style>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "GameStatistics",
  setup: () => {
    const { state } = useStore();
    const { trainingDayNumber, lastResult, accuracy } = computed(() => state.statistics).value;

    return {
      trainingDayNumber,
      lastResult,
      accuracy,
    };
  },
});
</script>
