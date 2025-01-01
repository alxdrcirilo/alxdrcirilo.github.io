<template>
  <div class="title">
    <h1 style="font-weight: bold; margin: 4px 0;">
      {{ title }}
    </h1>
    <a
      v-if="repo"
      id="github-icon"
      :href="repo"
      target="_blank"
      rel="icon"
      class="fab fa-github icon"
    />
  </div>

  <p class="description">
    {{ description }}
  </p>

  <div class="metadata-container">
    <div class="metadata-item">
      <strong>Date:</strong>
    </div>
    <div class="metadata-item">
      {{ new Date(date).toDateString() }}
    </div>
    <div class="metadata-item">
      <strong>Read:</strong>
    </div>
    <div
      class="metadata-item"
      style="display:flex; align-items: center; gap: 4px;"
    >
      {{ readtime }} min<i class="fas fa-clock" />
    </div>
    <div class="metadata-item">
      <strong>Tags:</strong>
    </div>
    <div class="metadata-item">
      <span
        v-for="tagType in ['field', 'language', 'type']"
        :key="tagType"
      >
        <template
          v-for="tag in tags[tagType].sort()"
          :key="tag"
        >
          <div class="tags">
            <NuxtLink :to="`/search/${tagType}?${tag.toLowerCase()}`">
              <code
                class="chip"
                :style="$getTagStyle(tagType)"
              >
                {{ $isAbbreviation(tag) ? tag.toUpperCase() : $capitalize(tag) }}
              </code>
            </NuxtLink>
          </div>
        </template>
      </span>
    </div>
  </div>
  <hr style="margin-bottom: 6px;">
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    repo: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    readtime: {
      type: String,
      required: true,
    },
    tags: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.tags {
    display: inline-flex;
    padding-bottom: 4px;
}

.metadata-container {
    display: grid;
    gap: 2px 6px;
    grid-template-columns: auto 1fr;
}
</style>
