<template>
  <span class="timer">{{ timer }}</span>
</template>

<style scoped>
.timer {
  font-size: 24px;
  font-weight: 700;
  min-width: 100px;
  padding: 4px 10px;
  border: 2px solid teal;
  border-radius: 6px;
  text-align: center;
}
</style>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from "vue";

export default defineComponent({
  name: "GameTimer",
  props: {
    duration: { type: Number, required: true },
  },
  emit: {
    finishTimer: null,
  },
  setup: (props, { emit }) => {
    const timeSec = ref(props.duration * 60);
    const timer = ref(`${props.duration < 10 ? "0" + props.duration : props.duration}:00`);

    const timeoutID = setInterval(() => {
      if (timeSec.value === 0) {
        clearInterval(timeoutID);
        emit("finishTimer");
      }

      timeSec.value -= 1;

      const timeLeft = timeSec.value / 60;
      const min = Math.trunc(timeLeft);

      let sec = Math.round((timeLeft - min) * 60);
      sec = sec > 0 ? sec : 0;

      timer.value = `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
    }, 1000);

    onUnmounted(() => {
      clearInterval(timeoutID);
    });

    return { timer };
  },
});
</script>
