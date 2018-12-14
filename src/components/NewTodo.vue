<template>
    <div class="new-todo-wrapper">
        <h2 class="new-todo-heading">Add New Todo </h2>
        <!-- Error display -->
        <p v-if="errors.length">
          <b style="color: #bbb">Please correct the following error(s):</b>
          <ul>
            <li style="color:red" v-for="(error,index) in errors" :key="index">{{ error }}</li>
          </ul>
        </p>

        <!-- Success msg -->
        <transition name="fade">
          <p v-if="success" class="sa-success">
           <b>Added Successfully.</b>
          </p>
        </transition>

        <!-- If the category is specified already. -->
        <div v-if="this.todoCategory && category.length">
          <form class="new-todo-form">
            <input class="new-todo-input" type="text" v-model="content" placeholder="I want to .." required>
            <select class="new-todo-category" v-model="category[0].id">
              <option disabled value="">Category</option>
              <option v-for="(item,index) in categories" v-bind:value="item.id" :key="index">{{item.name}}</option>
            </select>
            <button class="add-new-todo-btn" @click.prevent="addTodo(category[0].id)">Add</button>
          </form>
        </div>
        <div v-else> <!-- if category is not specified -->
          <form class="new-todo-form">
            <input class="new-todo-input" type="text" v-model="content" placeholder="I want to .." required>
            <select class="new-todo-category" v-model="category">
              <option disabled value="">Category</option>
              <option v-for="(item,index) in categories" v-bind:value="item.id" :key="index">{{item.name}}</option>
            </select>
            <button class="add-new-todo-btn" @click.prevent="addTodo(category)">Add</button>
          </form>
        </div>


    </div>
</template>

<script>
import { db, auth } from "@/firebaseConfig";
export default {
  name: "newTodo",
  data() {
    return {
      content: "", // Content for the new todo to be added.
      isCompleted: false, // Status of the newly added todo.
      category: "", // Category of the todo.
      categories: [],
      errors: [],
      success: false
    };
  },
  props: ["todoCategory"], // If category is specified
  firestore() {
    if (this.todoCategory) {
      return {
        categories: db
          .collection("categories")
          .where("user", "==", auth.currentUser.uid),
        category: db
          .collection("categories")
          .where("user", "==", auth.currentUser.uid)
          .where("name", "==", this.todoCategory)
          .limit(1)
      };
    }
    return {
      categories: db
        .collection("categories")
        .where("user", "==", auth.currentUser.uid)
    };
  },
  computed: {},
  methods: {
    // Add todo.
    addTodo(category) {
      if (this.checkForm(category)) { // Perform checks.
        // Grab current date.
        const createdAt = new Date();

        // Add to db.
        db.collection("todos").add({
          content: this.content,
          isCompleted: this.isCompleted,
          category: category,
          createdAt: createdAt,
          user: auth.currentUser.uid
        });

        // Show success message.
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 1000);

        // Reset.
        this.content = "";

        // If it is not the page where category is specified then null the category too.
        if (!this.todoCategory) {
          this.category = "";
        }
      }
    },
    checkForm: function(category) { // Form checks.
      // Reset array of errors.
      this.errors = [];

      // No error.
      if (this.content && category) {
        return true;
      }

      // Else Populate the errors.
      if (!this.content) {
        this.errors.push("Todo text required.");
      }
      if (!category) {
        this.errors.push("Please select a category.");
      }
    }
  }
};
</script>

<style>

.new-todo-wrapper {
  background: white;
  padding: 20px 20px 30px 20px;
  border-radius: 8px;
}

h2{
  margin:0;
}

.new-todo-heading{
margin-bottom: 20px;
}

.new-todo-form {
  display:flex;
  align-items: center;
}

.new-todo-input{
  width: 200px;
}

.new-todo-category{
margin: 0 20px;
}

.add-new-todo-btn {
  background: #007aff;
  color: white;
  border: none;
  padding: 7px 14px;
}


ul {
  list-style: none;
}

.sa-success {
  background: #80bb00;
  color: white;
  padding: 5px 8px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
