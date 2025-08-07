<template>
  <div class="table-container">
    <table>
      <slot />
    </table>
  </div>
</template>

<style scoped>
.table-container {
  display: flex;
  overflow-x: auto;
}
table {
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.1rem;
}
</style>
