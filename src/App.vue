<template>
  <div class="app">
    <div class="todo__container">
      <h2 class="todo__title">TODO LIST</h2>
      <ul class="todo__list">
        <todo-element
          v-for="(element, index) in this.elements"
          :key="element.id"
          :id="element.id"
          v-model="element.value"
          @remove="this.elements.splice(index, 1)"
        ></todo-element>
        <li class="todo__element">
          <div class="todo__element-container">
            <input class="todo__input" v-model="this.newElementVal" />
            <button
              class="todo__button"
              @click="addNewElementAsync(this.newElementVal), this.newElementVal = ''"
            >+</button>
          </div>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <p v-show="this.$store.state.show" class="alert">Changes Saved!</p>
    </transition>
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
  computed: mapState(["elements"]),
  mounted() {
    //get elements from IDB on mount
    this.updateFromDBAsync();
  },
};
</script>
<style>
html,
body,
#app {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #2d4059;
  margin: 0;
  width: 100%;
  height: 100%;
}

.todo__container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 20px;
  width: 400px;
  height: 600px;
  background: #ea5455;
}

.todo__title {
  color: #e5e5e5;
  font-family: Arial, Helvetica, sans-serif;
  margin: 20px 0 0 0;
}

.todo__list {
  overflow-y: auto;
  padding: 0;
  margin: 0 20px 20px 20px;
  width: calc(100% - 40px);
}

.todo__element {
  margin-top: 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.todo__element-container {
  width: 220px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.todo__button,
.todo__checkbox {
  height: 30px;
  width: 30px;
  margin: 0;
  padding: 0;
  border: none;
  background: #e5e5e5;
}

.todo__input {
  height: 30px;
  border: none;
  padding: 0;
}

.alert {
  position: absolute;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 24px;
  color: #e5e5e5;
  font-family: Arial, Helvetica, sans-serif;
  background: #ea5455;
  width: 400px;
  height: 40px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin: 0;
  top: 0;
}

.fade-enter-active,
.fade-leave-active {
  -webkit-transition: -webkit-transform 0.5s ease;
  transition: -webkit-transform 0.5s ease;
  transition: transform 0.5s ease;
  transition: transform 0.5s ease, -webkit-transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  -webkit-transform: translateY(-40px);
  transform: translateY(-40px);
}

/* # sourceMappingURL=style.css.map */
</style>