<template>
  <div>
    <ContentDoc v-slot="{ doc }" style="text-align: justify;">
      <article>
        <!-- Header -->
        <header>
          <div class="header">
            <h1 style="margin: 4px 0;">{{ doc.title }}</h1>
            <a
            :href="doc.repo"
            target="_blank"
            id="github-icon"
            rel="icon"
            class="fab fa-github icon"
            ></a>
          </div>
          <p>{{ doc.description }}</p>
          <p style="margin: 4px 0;"><strong>Date</strong>: {{ new Date(doc.date).toDateString() }}</p>
          <strong>Tags</strong>:
          <span v-for="tagType in ['field', 'language', 'type']" :key="tagType">
            <template v-for="tag in doc.tags[tagType]" :key="tag">
              <div class="tags">
                <NuxtLink :to="`/search/${tagType}?${tag.toLowerCase()}`">
                  <code class="chip" :style="getTagStyle(tagType)">{{ tag.charAt(0).toUpperCase() + tag.slice(1) }}</code>
                </NuxtLink>
              </div>
            </template>
          </span>
        </header>
        <hr style="margin-bottom: 6px;">
        <!-- Table of contents -->
        <div>
          <div @click="toggleToc" style="display: inline-flex;">
              <p class="toc-toggle" v-if="isTocOpen">
                Hide <strong>Table of Contents</strong>
              </p>
              <p class="toc-toggle" v-if="!isTocOpen">
                Show <strong>Table of Contents</strong>
              </p>
          </div>
          <div v-if="isTocOpen">
            <toc :links="doc.body.toc.links"/>
            <hr>
          </div>
        </div>
        <!-- Body -->
        <ContentRenderer :value="doc" style="text-align: justify;" />
      </article>
    </ContentDoc>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTocOpen: false,
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
    toggleToc() {
      this.isTocOpen = !this.isTocOpen;
    },
  },
};
</script>

<style>
.header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.toc-toggle {
  border: 1px solid #888;
  border-radius: 4px;
  cursor: pointer;
  font-size: 85%;
  margin-bottom: 16px;
  padding: 4px;
  user-select: none;
}
.toc-toggle:hover {
  color: lightgray;
}
figure {
  display: flex;
  justify-content: center;
  margin: auto;
  padding-bottom: 2%;
  width: 90%;
}
.figure-image {
  width: inherit;
}
.figure-caption {
  border-top: 1px solid gray;
  display: block;
  font-size: smaller;
  margin: auto;
  padding: 2% 4% 6% 4%;
  text-align: center;
  width: fit-content;
}
.snippet {
  background-color: rgba(106, 142, 35, 0.5);
  border-radius: 4px;
  cursor: pointer;
  padding: 2px;
}
.snippet:hover {
  opacity: 0.5;
}
</style>
