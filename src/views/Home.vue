<template>
  <div class="banner">
    <div class="title">Keeper — Your Todo App</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>

<style>
.banner {
  background: linear-gradient(rgba(255, 255, 255, 0.8)),
    url("https://i.imgur.com/zHvMkeY.png");
  /* opacity: 0.5; */
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 3.5rem;
  font-weight: 700;
}
</style>
