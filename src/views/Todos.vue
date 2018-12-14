<template>
  <div class="todos-page-wrapper">
    <!-- Render the categories component -->
    <Categories/>
    <!-- Homepage stuff -->
    <div class="todo-homepage">
      <div class="completed-todo-btn-wrapper">
        <router-link to="/done" class="btn-compl-todo">View Completed</router-link>
      </div>
      <!-- Render New Todo Component -->
      <NewTodo/>
      <!-- Todo List component, the prop indicates it should show pending Todos -->
      <TodoList page="pendingTodos"/>
    </div>
  </div>
</template>

<script>
import NewTodo from "@/components/NewTodo.vue";
import TodoList from "@/components/TodoList.vue";
import Categories from "@/components/Categories.vue";

export default {
  name: "todos",
  components: {
    NewTodo,
    TodoList,
    Categories
  }
};
</script>

<style>
.todos-page-wrapper {
  display: flex;
  background-color: #f5f6fa;
  height: 90vh;
  padding: 30px;
}
.todo-homepage {
  margin-left: 20px;
  flex: 1;
}
.todos-page-wrapper .sa-todo-text {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.completed-todo-btn-wrapper {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  /* justify-content: flex-end; */
}

.btn-compl-todo {
  font-weight: 700;
  text-decoration: none;
  padding: 7px 20px;
  font-size: 0.9rem;
  background: #f5bc45;
  color: white;
  border-radius: 4px;
  margin: 2px 0;
  transition: all 0.4s ease 0s;
}

.btn-compl-todo:hover {
  background: #f5b62d;
}
</style>
