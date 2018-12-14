<template>
    <div class="todos-page-wrapper">
      <div class="todo-homepage">
        <router-link to="/todos" class="btn-todo">View Todos</router-link>

        <!-- Show errors. -->
        <div class="edit-todo-wrapper">
          <p>Don't forget to save after making change.</p>
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li style="color:red" v-for="(error,index) in errors" :key="index">{{ error }}</li>
          </ul>
        </p>

        <!-- Todo fields -->
        <form class="new-todo-form">

        <!-- Completion checkbox -->
        <input type="checkbox" class="todo-checkbox" v-model="todo.isCompleted">

        <!-- Name of todo -->
        <input type="text" v-model="todo.content" required id="todo-input" v-bind:style="{ 'min-width': minWidthInput*8 + 'px' }" onInput="this.style.width = ((this.value.length + 1) * 8) + 'px';">

        <!-- Categories -->
        <select class="new-todo-category" v-model="todo.category">
          <option disabled value="">Category</option>
          <option v-for="(item,index) in categories" v-bind:value="item.id" :key="index">{{item.name}}</option>
        </select>

        <!-- Save Button-->
        <button class="add-new-todo-btn" @click.prevent="updateTodo()">Save</button>
        </form>

        <!-- Success message -->
        <transition name="fade">
          <p v-if="success" class="sa-success">
           <b>Updated Successfully.</b>
          </p>
        </transition>
        </div>
        </div>
    </div>
</template>

<script>
import { db,auth } from "@/firebaseConfig";

export default {
  name: "todo",
  data() {
    return {
      todoId: this.$route.params.id,
      todo: {},
      categories: [],
      errors: [],
      success: false
    };
  },
  firestore() { // Hooks into lifecycle methods and run with render
    return {
      todo: db.collection("todos").doc(this.$route.params.id), // Grab todo.
      categories: db.collection("categories").where("user", "==", auth.currentUser.uid) // Grab all categories.
    };
  },
  computed: {
    // Grab the category of current todo.
    resolvedCategory: function() {
      if (this.todo) {
        let cat = db.collection("categories").doc(this.todo);
        return cat.name;
      }
    },
    // Get the length of the of the input.
    minWidthInput: function() {
      if (this.todo.content) {
        return this.todo.content.length;
      }
    }
  },
  methods: {
    // Update the todo.
    updateTodo: function() {
      if (this.checkForm()) { // If passes the checks.

        // Update the todo.
        db.collection("todos")
          .doc(this.todoId)
          .update({
            isCompleted: this.todo.isCompleted,
            category: this.todo.category,
            content: this.todo.content
          });

        // Show the success message.
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 1000);
      }
    },
    checkForm: function() { // Check the form.
      // Empty the array if there's already an erorr.
      this.errors = [];

      // Perform check.
      if (this.todo.content && this.todo.category) {
        return true;
      }

      // Add the errors.
      if (!this.todo.content) {
        this.errors.push("Todo text required.");
      }
      if (!this.todo.category) {
        this.errors.push("Please select a category.");
      }
    }
  }
};
</script>

<style scoped>
.todo-checkbox{
  margin-right: 10px;
}
#todo-input {
  min-width: 200px;
}

.edit-todo-wrapper {
  margin-top: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  /* display: flex; */
  /* flex-direction: column; */
}
</style>
