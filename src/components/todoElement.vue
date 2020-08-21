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
        @change="$emit('remove'), removeElement()"
      />
    </div>
  </li>
</template>

<script>
export default {
  props: ["modelValue", "id"],
  data() {
    return {
      checked: true,
      changing: false,
    };
  },
  methods: {
    changeElement(val) {
      //this.changing = setTimeout(() => {
      this.$store.commit("changeVal", { id: this.id, val });
      //}, 500);
    },
    removeElement() {
      this.$store.commit("removeElement", this.id);
    },
  },
};
</script>

<style>
</style>