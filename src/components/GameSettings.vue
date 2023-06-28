<template>
  <div class="settings">
    <p class="settings__title">Настройки</p>

    <div class="settings__item slider">
      <p class="slider__title">Длительность {{ duration }} мин.</p>
      <q-slider v-model="duration" markers :marker-labels="durationMarkers" :min="durationLimits.min"
        :max="durationLimits.max" color="teal" />
    </div>

    <div class="settings__item slider">
      <p class="slider__title">Сложность {{ complexity }}</p>
      <q-slider v-model="complexity" markers :marker-labels="complexityMarkers" :min="complexityLimits.min"
        :max="complexityLimits.max" color="teal" />
    </div>

    <div class="settings__item column">
      <q-checkbox v-for="mo in mathOperationsLimits" :key="mo.key" :val="mo.key" :label="mo.name" v-model="mathOperations"
        color="teal" />
    </div>

    <div class="settings__item">
      <q-checkbox label="Использовать отрицательные" v-model="withNegative" color="teal" />
    </div>
  </div>
</template>

<style scoped>
.settings__title {
  font-size: 24px;
}

.settings__item:not(:last-child) {
  margin-bottom: 14px;
}

.slider__title {
  margin-bottom: 0;
}
</style>

<script lang="ts">
import { useStore } from "@/store";
import { SettingsType } from "@/types";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "GameSettings",
  setup: () => {
    const { state, dispatch } = useStore();
    const {
      complexity: complexityLimits,
      duration: durationLimits,
      mathOperations: mathOperationsLimits,
    } = computed(() => state.settingsLimits).value;

    return {
      complexityLimits,
      durationLimits,
      mathOperationsLimits,
      complexity: computed({
        get: () => state.settings.complexity,
        set: (c: SettingsType["complexity"]) =>
          dispatch("saveSettings", { complexity: c }),
      }),
      duration: computed({
        get: () => state.settings.duration,
        set: (d: SettingsType["duration"]) =>
          dispatch("saveSettings", { duration: d }),
      }),
      mathOperations: computed({
        get: () => state.settings.mathOperations,
        set: (mo: SettingsType["mathOperations"]) =>
          dispatch("saveSettings", { mathOperations: mo }),
      }),
      withNegative: computed({
        get: () => state.settings.withNegative,
        set: (wn: SettingsType["withNegative"]) =>
          dispatch("saveSettings", { withNegative: wn }),
      }),
      complexityMarkers: [
        { value: complexityLimits.min, label: complexityLimits.min },
        { value: complexityLimits.max, label: complexityLimits.max },
      ],
      durationMarkers: [
        { value: durationLimits.min, label: durationLimits.min },
        { value: durationLimits.max, label: durationLimits.max },
      ],
    };
  },
});
</script>
