<template>
  <div v-html="task" ref="gameField"></div>
</template>

<style>
.fake-input {
  display: inline-block;
  min-width: 30px;
  position: relative;
  text-align: center;
}

.fake-input::before {
  content: "";
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #000;
}
</style>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "GameField",
  props: {
    content: { type: String, required: true },
    fakeInput: { type: String, required: true },
  },
  setup: (props) => {
    const task = ref(props.content);
    const gameField = ref(null);

    const getGameField = (): HTMLElement => gameField.value as unknown as HTMLElement;
    const getFakeInput = (): HTMLElement => getGameField().querySelector(".fake-input") as HTMLElement;

    watch(
      () => props.content,
      (newTask: string) => {
        task.value = newTask.replace("?", "<span class='fake-input'></span>");
      }
    );

    watch(
      () => props.fakeInput,
      (newFakeInput: string) => {
        getFakeInput().innerHTML = newFakeInput;
      }
    );

    return { task, gameField };
  },
});
</script>
