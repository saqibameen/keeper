<template>
  <div class="categories-wrapper">
    <div class="cat-header">
      <h2>Categories</h2>
    </div>
    <!-- Show all categories -->
    <ul>
      <li class="category-item" v-for="(item,index) in categories" :key="index">
        <router-link class="title-item" v-bind:to="'/todos/'+item.name">{{item.name}}</router-link>
        <div class="del-item">
          <small title="Delete" @click.prevent="delCategory(item.id)">&#10005;</small>
        </div>
      </li>
    </ul>
    <!-- Add category -->
    <div class="add-category">
      <!-- Render errors -->
      <p v-if="error">
        <b>Please correct the following error:</b>
        <br>
        {{error}}
      </p>
      <h3>Add Category</h3>
      <!-- Add category fields -->
      <form>
        <input class="add-cat-input" type="text" v-model="categoryName">
        <button class="add-cat-btn" @click.prevent="addCategory()">+</button>
      </form>
    </div>
  </div>
</template>

<script>
import { db, auth } from "@/firebaseConfig";

export default {
  name: "categories",
  data() {
    return {
      categories: [],
      categoryName: "",
      error: ""
    };
  },
  firestore() {
    // Grab all categories.
    return {
      categories: db
        .collection("categories")
        .where("user", "==", auth.currentUser.uid)
        .orderBy("createdAt")
    };
  },
  computed: {},
  methods: {
    // Add Category to db.
    addCategory() {
      // Check if name is written.
      if (this.categoryName) {
        const createdAt = new Date(); // Current date.

        // Saves category.
        db.collection("categories").add({
          name: this.categoryName,
          user: auth.currentUser.uid,
          createdAt: createdAt
        });

        this.categoryName = ""; // Reset category.
      } else {
        this.error = "Enter a category name"; // Add error.
      }
    },
    // Delete Category.
    delCategory(id) {
      db.collection("categories")
        .doc(id)
        .delete();
    }
  }
};
</script>

<style scoped>
.categories-wrapper {
  background: white;
  padding-top: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}
.cat-header {
  text-align: center;
}
.category-item {
  padding: 20px 60px 20px 40px;
  display: flex;
  font-weight: 700;
  font-size: 0.9rem;
  background: #f5fafe;
  margin-top: 2px;
  color: #3e4886;
}
.category-item:hover {
  background: #f5fafe;
}

.title-item {
  flex: 1;
  color: #3e4886;
}
.title-item:hover {
  color: #8a91bb;
}

small {
  cursor: pointer;
}

small:hover {
  color: #8a91bb;
}

h2 {
  margin: 0;
}
ul {
  padding: 0;
}

a {
  text-decoration: none;
  text-transform: capitalize;
}

.add-category {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 20px 40px 20px;
}

h3 {
  text-align: center;
}

.add-cat-input {
  height: 40px;
  padding-right: 50px;
  padding-left: 5px;
}
.add-cat-input:focus {
  outline: none;
}

.add-cat-btn {
  height: 38px;
  margin-left: -50px;
  padding: 0px 20px;
  background: #007aff;
  color: white;
  font-weight: 700;
}
</style>
