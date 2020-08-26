<template>
  <div class="app">
    <p :class="[{'alert--show': show}, 'alert']">Changes Saved!</p>
    <div class="todo__container">
      <h2 class="todo__title">TODO LIST</h2>
      <transition-group appear id="todo__list" class="todo__list" name="todo__list" tag="ul">
        <todo-element-container
          class="todo__element"
          v-for="(element, index) in this.elements"
          :key="element.id"
        >
          <todo-element :id="element.id" :index="index" v-model="element.value"></todo-element>
        </todo-element-container>
        <todo-element-container key="-1">
          <input class="todo__input" v-model="newElementVal" />
          <button
            class="todo__button"
            @click="addNewElementAsync(this.newElementVal), this.newElementVal = ''"
          >+</button>
        </todo-element-container>
      </transition-group>
    </div>
  </div>
</template>
<script>
import todoElement from "./components/todoElement";
import todoElementContainer from "./components/todoElementContainer";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      newElementVal: "",
    };
  },
  components: {
    "todo-element": todoElement,
    "todo-element-container": todoElementContainer,
  },
  methods: mapActions(["addNewElementAsync", "updateFromDBAsync"]),
  computed: mapState(["elements", "show"]),
  mounted() {
    //get elements from IDB on mount
    this.updateFromDBAsync();
  },
};
</script>
<style lang="sass">
@import 'style/style.sass'
</style>