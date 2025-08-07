<template>
  <div class="not-found">
    <p>Sorry, the page you are looking for does not exist.</p>
    <nuxt-link to="/">Go to Homepage</nuxt-link>
  </div>
</template>

<script>
export default {
  layout: "default",
};
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
}

.not-found h1 {
  font-size: 50px;
}

.not-found p {
  font-size: medium;
}
</style>
