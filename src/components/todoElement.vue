<template>
  <li class="todo__element">
    <div class="todo__element-container">
      <input
        class="todo__input"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value), changeElement($event.target.value)"
      />
      <input
        type="checkbox"
        class="todo__checkbox"
        :checked="checked"
        @change="$emit('remove'), removeElementAsync(this.id)"
      />
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";

let changing;

export default {
  props: ["modelValue", "id"],
  data() {
    return {
      checked: true,
    };
  },
  methods: {
    ...mapActions(["removeElementAsync", "changeValAsync"]),
    changeElement(value) {
      //call action after 0.5s, if no new changes are recieved
      clearTimeout(changing);
      changing = setTimeout(() => {
        this.changeValAsync({ id: this.id, value });
      }, 500);
    },
  },
};
</script>

<style>
</style>