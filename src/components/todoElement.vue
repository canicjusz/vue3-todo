<template>
  <li class="todo__element">
    <div class="todo__element-container">
      <input
        class="todo__input"
        :value="message"
        @input="changeVal({index: this.index, value: $event.target.value}), changeElement($event.target.value)"
      />
      <input
        type="checkbox"
        class="todo__checkbox"
        :checked="checked"
        @change="$emit('remove'), removeElementAsync({id: this.id, index: this.index})"
      />
    </div>
  </li>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  props: ["modelValue", "id", "index"],
  data() {
    return {
      checked: true,
    };
  },
  methods: {
    ...mapActions(["removeElementAsync", "changeValAsync"]),
    ...mapMutations(["changeVal"]),
    changeElement(value) {
      //call action after 0.5s, if no new changes are recieved
      clearTimeout(this.changing);
      this.changing = setTimeout(() => {
        this.changeValAsync({ id: this.id, value });
      }, 500);
    },
  },
  computed: {
    ...mapState(["elements"]),
    message() {
      return this.elements[this.index].value;
    },
  },
};
</script>

<style>
</style>