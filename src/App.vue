<template>
  <div class="app">
    <div class="todo__container">
      <h2 class="todo__title">TODO LIST</h2>
      <transition-group appear class="todo__list" name="todo__list" tag="ul">
        <todo-element
          v-for="(element, index) in this.elements"
          :key="element.id"
          :id="element.id"
          :index="index"
          v-model="element.value"
        ></todo-element>
        <li class="todo__element">
          <div class="todo__element-container">
            <input class="todo__input" v-model="newElementVal" />
            <button
              class="todo__button"
              @click="addNewElementAsync(this.newElementVal), this.newElementVal = ''"
            >+</button>
          </div>
        </li>
      </transition-group>
    </div>
    <p :class="[{'alert--show': show}, 'alert']">Changes Saved!</p>
  </div>
</template>
<script>
import todoElement from "./components/todoElement";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      newElementVal: "",
    };
  },
  components: {
    "todo-element": todoElement,
  },
  methods: mapActions(["addNewElementAsync", "updateFromDBAsync"]),
  computed: mapState(["elements", "show"]),
  mounted() {
    //get elements from IDB on mount
    this.updateFromDBAsync();
  },
  watch: {
    newElementVal() {
      console.log(this.newElementVal);
    },
  },
};
</script>
<style lang="sass">
@import 'style/style.sass'
</style>