<template>
  <div class="todos-page-wrapper">
    <div class="todo-homepage">
      <div class="completed-todo-btn-wrapper">
        <div class="cat-name">{{$route.params.category}}</div>
        <!-- Link to vie todos of specific category -->
        <router-link v-bind:to="'/todos/'+$route.params.category" class="btn-todo">View Todos</router-link>
      </div>
      <!-- Render the Todo list with completed todos only of the specific category (passed as prop) -->
      <TodoList page="doneTodos" v-bind:todoCategory="$route.params.category"/>
    </div>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList.vue";

export default {
  name: "doneCategory",
  components: {
    TodoList
  }
};
</script>

<style scoped>
</style>
