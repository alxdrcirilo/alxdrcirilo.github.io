<template>
  <div>
    <h1>🏷️ Tags</h1>
    <p>Here you may find all the tags currently in use:</p>
    <ContentList
      v-slot="{ list }"
      path="/blog"
    >
      <div
        v-for="tagType in ['field', 'language', 'type']"
        :key="tagType"
        class="container"
      >
        <div class="field">
          <u>{{ $capitalize(tagType) }}</u>:
        </div>
        <div>
          <span
            v-for="(count, tag) in getUniqueTags(list, tagType)"
            :key="tag"
          >
            <div class="tags">
              <NuxtLink :to="`search/${tagType}?${tag.toLowerCase()}`">
                <code
                  v-if="$isAbbreviation(tag)"
                  class="chip"
                  :style="$getTagStyle(tagType)"
                >{{ tag.toUpperCase() }}<sup>{{ count }}</sup></code>
                <code
                  v-else
                  class="chip"
                  :style="$getTagStyle(tagType)"
                >{{ $capitalize(tag) }}<sup>{{ count }}</sup></code>
              </NuxtLink>
            </div>
          </span>
        </div>
      </div>
    </ContentList>
  </div>
</template>

<script>
export default {
  methods: {
    getUniqueTags(list, property) {
      // Get unique tags frequency
      const tags = list.flatMap(article => article.tags[property])
      const uniqueTags = {}
      for (const tag of tags.sort()) {
        if (uniqueTags[tag]) {
          uniqueTags[tag] += 1
        }
        else {
          uniqueTags[tag] = 1
        }
      };
      return uniqueTags
    },
  },
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
