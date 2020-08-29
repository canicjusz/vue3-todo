<template>
  <div class="app">
    <p :class="[{'alert--show': show}, 'alert']">Changes Saved!</p>
    <div class="todo__container">
      <h2 class="todo__title">TODO LIST</h2>
      <transition-group appear id="todo__list" class="todo__list" name="todo__list" tag="ul">
        <todo-element-container
          class="todo__element"
          v-for="(element, index) in elements"
          :key="element.id"
        >
          <todo-element :id="element.id" :index="index" v-model="element.value"></todo-element>
        </todo-element-container>
        <todo-element-container key="-1">
          <input class="todo__input" v-model="newElementVal" />
          <button
            class="todo__button"
            @click="addNewElementAsync(newElementVal), newElementVal = ''"
          >+</button>
        </todo-element-container>
      </transition-group>
    </div>
  </div>
</template>
<script>
import todoElement from "@/components/todoElement";
import todoElementContainer from "@/components/todoElementContainer";
import { mapActions, useStore } from "vuex";
 import { ref, onMounted, computed } from "vue";

export default {
  components: {
    "todo-element": todoElement,
    "todo-element-container": todoElementContainer,
  },
  setup() {
    const newElementVal = ref("");

    const { state, dispatch } = useStore();

    const { addNewElementAsync } = mapActions(["addNewElementAsync"]);

    const stateVuex = (val) => computed(() => state[val]);
    const elements = computed(() => state['elements'])
    const show = stateVuex("show");

    onMounted(async() => {
      //when I call this action from destructurisation (check todoElement component) it tells me that there is no 'this' object so I had to do a workaround
      await dispatch("updateFromDBAsync");
    });

    return {
      newElementVal,
      addNewElementAsync,
      elements,
      show,
    };
  },
};
</script>