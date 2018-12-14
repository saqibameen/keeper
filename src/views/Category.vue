<template>
  <div class="todos-page-wrapper">
    <!-- <Categories/> -->
    <div class="todo-homepage">
      <div class="completed-todo-btn-wrapper">
        <div class="cat-name">{{$route.params.category}}</div>
        <!-- To see completed todos of a specific category -->
        <router-link
          v-bind:to="'/done/'+$route.params.category"
          class="btn-compl-todo"
        >View Completed</router-link>
      </div>
      <!-- Take to new todo page but the category is auto added (passed as prop) -->
      <NewTodo v-bind:todoCategory="$route.params.category"/>
      <!-- Not Completed todos -->
      <TodoList page="pendingTodos" v-bind:todoCategory="$route.params.category"/>
    </div>
  </div>
</template>

<script>
import NewTodo from "@/components/NewTodo.vue";
import TodoList from "@/components/TodoList.vue";
import Categories from "@/components/Categories.vue";

export default {
  name: "category",
  components: {
    NewTodo,
    TodoList,
    Categories
  }
};
</script>

<style>
.cat-name {
  font-size: 2rem;
  margin-right: 5rem;
}
</style>
