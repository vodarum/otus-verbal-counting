<template>
  <div class="layout">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.layout {
  padding: 20px 0;
}

.layout::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30%;
  max-height: 150px;
  background: #26a69a;
}

.container {
  width: 90%;
  max-width: 950px;
  height: 100%;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #f5f5f5;
  box-shadow: 0 1px 8px #0003, 0 3px 4px #00000024, 0 3px 3px -2px #0000001f;
  overflow: hidden;
  position: relative;
  z-index: 4000;
}
</style>

<script lang="ts">
import { store } from "./store";

export default {
  name: "LayoutDefault",
  setup: () => {
    store.dispatch("initStore");
  },
};
</script>
