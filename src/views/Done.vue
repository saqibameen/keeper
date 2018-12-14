<template>
  <div class="todos-page-wrapper">
    <Categories/>
    <div class="todo-homepage">
      <div class="completed-todo-btn-wrapper">
        <!-- To view all todos -->
        <router-link to="/todos" class="btn-todo">View Todos</router-link>
      </div>
      <!-- Show TodoList but only completed (prop indicates the filter) -->
      <TodoList page="doneTodos"/>
    </div>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList.vue";
import Categories from "@/components/Categories.vue";

export default {
  name: "done",
  components: {
    TodoList,
    Categories
  }
};
</script>

<style>
.todos-page-wrapper .sa-todo-text {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-todo {
  font-weight: 700;
  text-decoration: none;
  padding: 7px 20px;
  font-size: 0.9rem;
  background: #80bb00;
  color: white;
  border-radius: 4px;
  margin: 2px 0;
  transition: all 0.4s ease 0s;
}

.btn-todo:hover {
  background: rgb(166, 216, 57);
}
</style>
