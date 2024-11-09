<template>
  <div
    v-for="year in years"
    :key="year"
  >
    <ContentList
      v-slot="{ list: articles }"
      :path="`/blog/${year}`"
      :query="query"
    >
      <h1>
        {{ year }}<sup>({{ articles.length }})</sup>
      </h1>
      <ul class="article-list">
        <li
          v-for="article in articles"
          :key="article._path"
        >
          <div class="article-section">
            <NuxtLink
              :to="`${article._path}`"
              class="article-title"
            >
              {{ article.title }}
            </NuxtLink>
            <div class="article-date">
              {{ article.date }}
            </div>
          </div>
        </li>
      </ul>
    </ContentList>
  </div>
</template>

<script>
export default {
  data() {
    return {
      years: [2024],
      param: null,
      tag: null,
      query: {
        where: {
          tags: {},
        },
        sort: {
          date: -1,
        },
      },
    }
  },
  created() {
    // Get articles based on query (e.g. { language: python })
    this.param = this.$route.path.split('/').pop()
    this.tag = Object.keys(this.$route.query).pop()
    this.query.where.tags[this.param] = {
      $contains: this.tag,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 2.2rem;
  margin-bottom: 18px;
}

h1 sup {
  font-size: 1rem;
  opacity: 0.8;
}

.article-list {
  list-style: square;
  margin-left: 24px;
  margin-right: 12px;
}

.article-section {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  padding-left: 2px;
}

.article-title {
  font-weight: bold;
}

.article-title:hover {
  text-decoration: underline;
}

.article-date {
  font-size: 1.1rem;
  opacity: 0.8;
  white-space: nowrap;
}
</style>
