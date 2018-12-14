<template>
  <div class="auth">
    <router-link to="/todos" v-if="user">Todos</router-link>
    <template v-if="!user">
      <a href @click.prevent="signInWithGoogle">Sign in with Google</a>
    </template>
    <template v-if="user">
      <a href @click.prevent="signOut">Sign Out</a>
    </template>
  </div>
</template>

<script>
import { auth, provider } from "@/firebaseConfig";

export default {
  name: "auth",

  data() {
    return {
      user: null
    };
  },
  // Lifecycle hook to check if user present.
  beforeCreate: function() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    });
  },

  methods: {
    // Sign in with Google.
    signInWithGoogle: function() {
      auth
        .signInWithRedirect(provider)
        .then(result => {
          this.user = result.user;
        })
        .catch(err => console.log(err));
    },
    // Sign out function.
    signOut: function() {
      auth
        .signOut()
        .then(() => {
          this.user = null;
          // Redirection.
          this.$router.replace("/");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>
