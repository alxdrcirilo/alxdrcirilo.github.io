<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 2.5rem;
  padding: 1rem;
  background-color: #43573866;
  border-radius: 0.75rem;
}

:deep(p) {
  margin: auto;
  text-align: left;
}
</style>
