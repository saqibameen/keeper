<template>
  <div class="header">
    <div class="header-item">
      <router-link to="/">
        <img class="logo" src="@/assets/logo.png" alt>
      </router-link>
    </div>
    <div class="header-item nav">
      <Auth/>
    </div>
  </div>
</template>

<script>
import Auth from "@/components/Auth.vue";

export default {
  name: "navbar",
  components: {
    Auth
  }
};
</script>

<style>
.header {
  display: flex;
  padding: 20px 40px;
}
.header-item {
  flex: 1;
}
.logo {
  width: 150px;
}
.nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.nav a {
  text-decoration: none;
  font-weight: 700;
  margin-left: 20px;
  color: #36407d;

  transition: all 0.2s ease-out, opacity 0.2s ease 0.4s;
}

.nav a:hover {
  color: #a4abd3;
}

.nav a.router-link-exact-active {
  color: #a4abd3;
}
</style>
