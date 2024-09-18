<template>
  <div v-for="year in years" :key="year">
    <h2>{{ year }}</h2>
    <ContentList v-slot="{ list }" :path="`/blog/${year}`" :query="query">
      <section>
        <div v-for="article in list" :key="article._path">
          <!-- Article -->
          <section class="article-section">
            <NuxtLink :to="`${article._path}`" class="article-title">{{ article.title }}</NuxtLink>
            <p class="readtime-p"><i class="fa-solid fa-clock"/>{{ article.readtime }} min</p>
            <ul class="article-details">
              <li>{{ article.description }}</li>
              <li>
                <strong>Date</strong>: {{ new Date(article.date).toDateString() }}
                <br>
                <strong>Tags</strong>:
                <span v-for="tagType in ['field', 'language', 'type']" :key="tagType">
                  <template v-for="tag in article.tags[tagType].sort()" :key="tag">
                    <div class="tags">
                      <NuxtLink :to="`/search/${tagType}?${tag}`">
                        <code v-if="$isAbbreviation(tag)" class="chip" :style="$getTagStyle(tagType)">
                          {{ tag.toUpperCase() }}
                        </code>
                        <code v-else class="chip" :style="$getTagStyle(tagType)">
                          {{ $capitalize(tag) }}
                        </code>
                      </NuxtLink>
                    </div>
                  </template>
                </span>
              </li>
            </ul>
          </section>
        </div>
      </section>
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
          date: -1
        },
      },
    };
  },
  created() {
    // Get articles based on query (e.g. { language: python })
    this.param = this.$route.path.split("/").pop();
    this.tag = Object.keys(this.$route.query).pop();
    this.query.where.tags[this.param] = {
      $contains: this.tag,
    };
  },
};
</script>

<style scoped>
.article-section {
  padding-left: 2%;
}
.article-title {
  font-weight: bold;
  font-size: 120%;
}
.article-title:hover {
  opacity: 0.5;
}
.article-details {
  padding-left: 2%;
  padding-top: 1%;
  font-size: 11px;
}
.readtime-p {
  display: flex;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 2px;
  margin-bottom: 4px;
  align-items: center;
}
.fa-clock {
  margin-right: 6px;
}
</style>
