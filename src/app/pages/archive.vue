<template>
  <div>
    <h1>📔 Archive</h1>
    <PostContainer :posts="posts" />
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData("content", () =>
  queryCollection("content").order("date", "DESC").all(),
);
</script>
