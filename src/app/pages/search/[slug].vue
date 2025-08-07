<template>
  <div>
    <h1>🏷️ Tags</h1>
    <h2>
      Posts with tag:
      <strong v-if="$isAbbreviation(tag)" class="tag">{{
        tag.toUpperCase()
      }}</strong>
      <strong v-else class="tag">{{
        tag.charAt(0).toUpperCase() + tag.slice(1)
      }}</strong>
    </h2>
    <PostContainer :posts="posts" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const tag = Object.keys(route.query).pop() || "";
const { data: posts } = await useAsyncData("tag-search", () =>
  queryCollection("content")
    .where("tags", "LIKE", `%${tag}%`)
    .order("date", "DESC")
    .all(),
);
</script>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  background: #d2b48c80;
  border-radius: 4px;
  font-size: 0.8em;
  padding: 2px 6px;
  white-space: nowrap;
}
</style>
