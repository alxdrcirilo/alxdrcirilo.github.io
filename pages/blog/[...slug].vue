<template>
  <div>
    <ContentDoc :path="$route.path">
      <template #default="{ doc }">
        <!-- Header -->
        <header>
          <div class="header">
            <h1 style="font-weight: bold; margin: 4px 0;">{{ doc.title }}</h1>
            <a v-if="doc.repo"
            id="github-icon"
            :href="doc.repo"
            target="_blank"
            rel="icon"
            class="fab fa-github icon"
            />
          </div>
          <p>{{ doc.description }}</p>
          <p style="margin: 4px 0;"><strong>Date</strong>: {{ new Date(doc.date).toDateString() }}</p>
          <strong>Tags</strong>:
          <span v-for="tagType in ['field', 'language', 'type']" :key="tagType">
            <template v-for="tag in doc.tags[tagType].sort()" :key="tag">
              <div class="tags">
                <NuxtLink :to="`/search/${tagType}?${tag.toLowerCase()}`">
                  <code v-if="$isAbbreviation(tag)" class="chip" :style="$getTagStyle(tagType)">{{ tag.toUpperCase() }}</code>
                  <code v-else class="chip" :style="$getTagStyle(tagType)">{{ $capitalize(tag) }}</code>
                </NuxtLink>
              </div>
            </template>
          </span>
        </header>
        <hr style="margin-bottom: 6px;">
        <!-- Table of contents -->
        <div>
          <div style="display: inline-flex;" @click="toggleToc">
              <p v-if="isTocOpen" class="toc-toggle">
                Hide <strong>Table of Contents</strong>
              </p>
              <p v-if="!isTocOpen" class="toc-toggle">
                Show <strong>Table of Contents</strong>
              </p>
          </div>
          <div v-if="isTocOpen">
            <toc :links="doc.body.toc.links" />
            <hr>
          </div>
        </div>
        <!-- Body -->
        <ContentRenderer :value="doc" style="text-align: justify;" />
      </template>
      <!-- Not found -->
      <template #not-found>
        <p style="text-align: center;">
          Nothing to see here! 🧐
          <br>
          Go back to the <NuxtLink id="nav-button" to="/archive">Archive</NuxtLink>
        </p>
      </template>
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
    toggleToc() {
      this.isTocOpen = !this.isTocOpen;
    },
  },
};
</script>

<style scoped>
:deep(li) {
  margin-bottom: 0.4rem;
  margin-left: 2rem;
  list-style: square;
}
:deep(.header) {
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
:deep(.toc-links) * {
  list-style: none;
}
:deep(.toc-toggle) {
  border-radius: 4px;
  border: 1px solid #888;
  cursor: pointer;
  font-size: 90%;
  margin-bottom: 16px;
  padding: 4px;
  user-select: none;
}
:deep(.toc-toggle:hover) {
  color: lightgray;
}
:deep(.footnotes) {
  margin-top: 20px;
  padding-top: 12px;
  width: fit-content;
}
:deep(.footnotes::before) {
  border-bottom: 1px dotted;
  content: "References";
  display: block;
  font-size: 1.1rem;
  margin-bottom: 6px;
}
:deep(.footnotes *) {
  color: inherit;
  font-size: 1.1rem;
  font-weight: normal;
  list-style: decimal;
}
:deep(table) {
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
}
:deep(table *) {
  font-size: 1.1rem;
  padding: 8px 10px;
  text-align: center;
}
:deep(th) {
  border: 1px solid darkgray;
}
:deep(td) {
  border: 1px dotted;
}
:deep(td > a) {
  text-decoration: underline;
}
:deep(td > a:hover) {
  opacity: 0.5;
}
:deep(figure) {
  display: flex;
  justify-content: center;
  margin: auto;
  padding-bottom: 2%;
  width: 90%;
}
:deep(.figure-image) {
  width: inherit;
}
:deep(.figure-caption) {
  border-top: 1px solid gray;
  display: block;
  font-size: smaller;
  margin: auto;
  padding: 2% 4% 6% 4%;
  text-align: center;
  width: fit-content;
}
:deep(.snippet) {
  background-color: rgba(106, 142, 35, 0.5);
  border-radius: 4px;
  cursor: pointer;
  padding: 2px;
}
:deep(.snippet:hover) {
  opacity: 0.5;
}
</style>
