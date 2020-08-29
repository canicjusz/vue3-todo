<template>
  <input
    class="todo__input"
    :value="modelValue"
    @input="changeVal({index, value: $event.target.value}), changeElement($event.target.value)"
  />
  <input
    type="checkbox"
    class="todo__checkbox"
    :checked="checked"
    :disabled="!checked"
    @change="$emit('remove'), removeElementAsync({id, index}), checked=false"
  />
</template>

<script>
import { mapActions, mapMutations, useStore } from "vuex";
import { toRefs, ref, watch } from "vue";

export default {
  props: ["modelValue", "id", "index"],
  setup(props) {
    //I mean this destructurisation
    const { removeElementAsync } = mapActions(["removeElementAsync"]);
    const { changeVal } = mapMutations(["changeVal"]);

    const { id } = toRefs(props);
    const { dispatch } = useStore();

    //when I call this action from destructurisation it tells me that there is no 'this' object so I had to do a workaround
    const dispatchVuex = (action) => (args) => dispatch(action, args);
    const changeValAsync = dispatchVuex("changeValAsync");

    const changeElement = (value) => {
      clearTimeout(changing.value);
      changing.value = setTimeout(() => {
        changeValAsync({ id: id.value, value });
      }, 500);
    };

    const checked = ref(true);
    const changing = ref(0);

    watch(checked, () => clearTimeout(changing.value));

    return {
      changeVal,
      changeElement,
      checked,
      removeElementAsync,
    };
  },
};
</script>

<style>
</style>