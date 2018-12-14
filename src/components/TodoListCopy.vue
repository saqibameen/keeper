<template>
    <div>
      {{todos}}
        <TodoItem
        v-for="(todo,index) in todos"
        v-bind:id="todo.id"
        v-bind:category="todo.category"
        v-bind:isCompleted="todo.isCompleted"
        :key="index"
        />
    </div>
</template>

<script>
import { db } from "@/firebaseConfig";
import TodoItem from "@/components/TodoItem.vue";

export default {
  name: "todoList",
  components: {
    TodoItem
  },
  data() {
    return {
      todos: [] // Contains all the todos.
    };
  },
  firestore() {
    console.log("hello");
    return {
      todos: db.collection("todos")
    };
  }
};
</script>

<style scoped>
</style>
