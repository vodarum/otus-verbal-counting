<template>
  <div class="home">
    <GameStatistics />

    <GameSettings style="margin: 40px 0" />

    <q-btn color="secondary" label="Играть" :disable="validateSettings" @click="goToGame" />
  </div>
</template>

<style scoped>
.home {
  padding: 20px;
}
</style>

<script lang="ts">
import GameSettings from "@/components/GameSettings.vue";
import GameStatistics from "@/components/GameStatistics.vue";
import router from "@/router";
import { setStorage } from "@/services/storage";
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {
    GameSettings,
    GameStatistics,
  },
  setup: () => {
    const { state, getters } = useStore();

    return {
      goToGame: () => {
        setStorage(state);
        router.replace({ path: "/game" });
      },
      validateSettings: computed(() => getters.validateSettings),
    };
  },
});
</script>
