<template>
  <div class="todo-list-wrapper">
    <h2 class="new-todo-heading">Todo List</h2>
    <div class="todos-wrapper-sorting">
      <!-- Call the todo item recursively. -->
      <TodoItem
        v-for="(todo,index) in todos"
        v-bind:id="todo.id"
        v-bind:content="todo.content"
        v-bind:category="todo.category"
        v-bind:isCompleted="todo.isCompleted"
        :key="index"
        v-bind:page="page"
        v-if="shouldShow(todo.category)"
      />
    </div>
  </div>
</template>

<script>
import { db, auth } from "@/firebaseConfig";
import TodoItem from "@/components/TodoItem.vue";

export default {
  name: "todoList",
  components: {
    TodoItem
  },

  data() {
    return {
      todos: [],
      category: ""
    };
  },

  props: ["page", "todoCategory"], // Which page it is.

  firestore() {
    // Grab the requried data from db based on page (specified by props).
    if (this.todoCategory) {
      return {
        todos: db
          .collection("todos")
          .where("user", "==", auth.currentUser.uid)
          .orderBy("createdAt"),
        category: db
          .collection("categories")
          .where("user", "==", auth.currentUser.uid)
          .where("name", "==", this.todoCategory)
          .limit(1)
      };
    }
    return {
      todos: db
        .collection("todos")
        .where("user", "==", auth.currentUser.uid)
        .orderBy("createdAt")
    };
  },
  computed: {},
  methods: {
    // Which todo list to show based on the page (specified by prop)
    shouldShow(currItemCat) {
      if (this.todoCategory && this.todos.length != 0) {
        if (this.category[0] != undefined)
          return this.category[0].id == currItemCat;
      }
      return true;
    }
  }
};
</script>

<style>
.todo-list-wrapper {
  background: white;
  padding: 20px 20px 30px 20px;
  border-radius: 8px;
  margin-top: 20px;
}
.todos-wrapper-sorting {
  display: flex;
  flex-direction: column-reverse;
}
</style>
