<template>
  <div class="title">
    <h1 class="main-title">{{ title }}</h1>
    <a v-if="repo" :href="repo" target="_blank" rel="noopener">
      <Icon class="icon" name="fa6-brands:github" />
    </a>
  </div>

  <p class="description">{{ description }}</p>

  <div class="metadata-container">
    <div class="metadata-item"><strong>Date:</strong></div>
    <div class="metadata-item">{{ formattedDate }}</div>
    <div class="metadata-item"><strong>Read:</strong></div>
    <div class="metadata-item readtime">
      {{ readtime }} min<Icon name="fa6-solid:clock" />
    </div>
    <div class="metadata-item"><strong>Tags:</strong></div>
    <div class="metadata-item">
      <template v-for="tagType in tagTypes" :key="tagType">
        <template v-for="tag in sortedTags(tagType)" :key="tag">
          <NuxtLink
            :to="`/search/${tagType}?${tag.toLowerCase()}`"
            class="tags"
          >
            <code class="chip" :style="$getTagStyle(tagType)">
              {{
                $isAbbreviation(tag)
                  ? tag.toUpperCase()
                  : tag.charAt(0).toUpperCase() + tag.slice(1)
              }}
            </code>
          </NuxtLink>
        </template>
      </template>
    </div>
  </div>
  <hr class="divider" />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: String,
  description: String,
  date: String,
  readtime: String,
  tags: Object,
  repo: String,
});

const tagTypes = ["field", "language", "type"];

const formattedDate = computed(() =>
  props.date ? new Date(props.date).toDateString() : "",
);

function sortedTags(type) {
  return props.tags?.[type]?.slice().sort() || [];
}
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-title {
  font-weight: bold;
  margin: 4px 0;
}

.tags {
  display: inline-flex;
  margin-bottom: 6px;
}

.metadata-container {
  display: grid;
  gap: 2px 6px;
  grid-template-columns: auto 1fr;
}

.readtime {
  display: flex;
  align-items: center;
  gap: 6px;
}

.divider {
  margin: 20px 0 20px;
}
</style>
