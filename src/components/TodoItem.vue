<template>
  <transition name="fade">
    <!-- The Todo -->
    <div class="sa-todo-content" v-if="todoShowLogic">
      <div class="sa-todo-checkbox">
        <input type="checkbox" v-model="todoIsCompleted" @click="toggleComplete(todoId)">
      </div>
      <router-link
        v-bind:to="'/todo/'+todoId"
        class="sa-todo-text"
        l
        v-bind:class="{ 'sa-todo-completed' : todoIsCompleted }"
      >{{todoContent}}</router-link>
    </div>
  </transition>
</template>

<script>
import { db } from "@/firebaseConfig";
export default {
  name: "todoItem",
  props: ["content", "isCompleted", "category", "id", "page"],
  data() {
    return {
      todoContent: this.content,
      todoIsCompleted: this.isCompleted,
      todoCategory: this.category,
      todoId: this.id
    };
  },
  methods: {
    // Update completed/ not completed
    toggleComplete(id) {
      db.collection("todos")
        .doc(id)
        .update({
          isCompleted: !this.todoIsCompleted
        });
    }
  },
  computed: {
    // Logic to switch pending/all todos.
    todoShowLogic() {
      return this.page == "pendingTodos"
        ? !this.todoIsCompleted
        : this.todoIsCompleted;
    }
  }
};
</script>

<style >
.sa-todo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  border: 2px solid #f7f7fd;
  border-radius: 8px;
}

.sa-todo-checkbox {
}
.sa-todo-content {
  display: flex;
  flex-direction: row;
  padding: 1rem 0;
  padding: 1rem;
  border: 2px solid #f7f7fd;
  border-radius: 8px;
}
.sa-todo-category {
  padding: 5px 8px;
  font-size: 0.9rem;
  background: #635cff;
  color: white;
  border-radius: 4px;
  margin: 2px 0;
}
.sa-todo-text {
  padding: 0 10px;
  color: black;
  text-decoration: none;
}

.sa-todo-completed {
  text-decoration: line-through;
  color: #ccc;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
