<template>
  <li class="todo__element">
    <div class="todo__element-container">
      <input
        class="todo__input"
        :value="this.modelValue"
        @input="changeVal({index: this.index, value: $event.target.value}), changeElement($event.target.value)"
      />
      <input
        type="checkbox"
        class="todo__checkbox"
        :checked="checked"
        :disabled="!checked"
        @change="$emit('remove'), removeElementAsync({id: this.id, index: this.index}), this.checked=false"
      />
    </div>
  </li>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

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
  watch: {
    //if checked changes remove changing timeout. Have
    //to do this because you could change the value and
    //then remove the elements. Since change function runs
    //with delay it can recreate the reestablish the element in IDB
    checked() {
      clearTimeout(this.changing);
    },
  },
};
</script>

<style>
</style>