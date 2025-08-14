<template>
  <div>
    <h1>🏷️ Tags</h1>
    <p>Here you may find all the tags currently in use:</p>
    <div
      v-for="tagType in ['field', 'language', 'type']"
      :key="tagType"
      class="container"
    >
      <div class="field">
        <u>{{ tagType.charAt(0).toUpperCase() + tagType.slice(1) }}</u
        >:
      </div>
      <div>
        <div
          v-for="(count, tag) in getUniqueTags(posts, tagType)"
          :key="tag"
          class="tags"
        >
          <NuxtLink :to="`/search/${tagType}?${tag.toLowerCase()}`">
            <code
              v-if="$isAbbreviation(tag)"
              class="chip"
              :style="$getTagStyle(tagType)"
            >
              {{ tag.toUpperCase() }}<sup>{{ count }}</sup>
            </code>
            <code v-else class="chip" :style="$getTagStyle(tagType)">
              {{ tag.charAt(0).toUpperCase() + tag.slice(1)
              }}<sup>{{ count }}</sup>
            </code>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: posts } = await useAsyncData("blog-tags", () => {
  return queryCollection("content").select("tags").all();
});

function getUniqueTags(posts, property) {
  const tags = posts.flatMap((post) => post.tags?.[property] || []);
  const uniqueTags = {};
  for (const tag of tags.sort()) {
    if (uniqueTags[tag]) {
      uniqueTags[tag] += 1;
    } else {
      uniqueTags[tag] = 1;
    }
  }
  return uniqueTags;
}
</script>

<style scoped>
.container {
  display: flex;
  margin-bottom: 16px;
  margin-left: 12px;
}

.field {
  min-width: 70px;
}

.tags {
  display: inline-flex;
  padding-bottom: 4px;
}
</style>
