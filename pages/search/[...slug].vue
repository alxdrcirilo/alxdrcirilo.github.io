<template>
  <div>
    <h4 style="display: flex; align-items: center
    ;">🏷️ Posts with tag:&nbsp;
      <div class="tag">
        {{ tag }}
      </div>
    </h4>
    <div>
      <ContentList path="/blog" v-slot="{ list }" :query="query">
        <section>
          <div v-for="article in list" :key="article._path">
            <!-- Article -->
            <section class="article-section">
              <NuxtLink :to="`${article._path}`" class="article-title">{{ article.title }}</NuxtLink>
              <ul class="article-details">
                <li>{{ article.description }}</li>
                <li>
                  <strong>Date</strong>: {{ new Date(article.date).toDateString() }}
                  <br>
                  <strong>Tags</strong>:
                  <span v-for="tagType in ['field', 'language', 'type']" :key="tagType">
                    <template v-for="tag in article.tags[tagType]" :key="tag">
                      <div class="tags">
                        <NuxtLink :to="`/search/${tagType}?${tag.toLowerCase()}`">
                          <code class="chip" :style="getTagStyle(tagType)">{{ tag.charAt(0).toUpperCase() + tag.slice(1) }}</code>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      param: null,
      tag: null,
      query: {
        where: {
          tags: {},
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
  methods: {
    getTagStyle(property) {
      const colorMap = {
        field: "tomato",
        language: "olivedrab",
        type: "teal",
      };
      return {
        backgroundColor: colorMap[property],
        borderRadius: "4px",
        color: "whitesmoke",
        fontSize: "11px",
        marginRight: "10px",
      };
    },
  },
};
</script>

<style scoped>
.tag {
  align-items: center;
  background-color: rgba(210, 180, 140, 0.5);
  border-radius: 4px;
  display: flex;
  font-size: 80%;
  font-weight: bold;
  padding: 4px;
}
.article-section {
  padding-left: 2%;
}
.article-title {
  font-weight: bold;
}
.article-details {
  padding-left: 2%;
  font-size: 11px;
}
</style>
