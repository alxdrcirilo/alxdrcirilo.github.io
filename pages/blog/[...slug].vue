<template>
  <div>
    <ContentDoc :path="$route.path">
      <template #default="{ doc }">
        <PostHeader
          :title="doc.title"
          :description="doc.description"
          :repo="doc.repo"
          :date="doc.date"
          :readtime="doc.readtime"
          :tags="doc.tags"
        />

        <div id="table-of-contents">
          <div
            style="display: inline-flex; cursor: pointer;"
            @click="toggleToc"
          >
            <p class="toc-toggle">
              <span v-if="isTocOpen">Hide</span>
              <span v-else>Show</span>
              <strong> Table of Contents</strong>
            </p>
          </div>
          <div v-if="isTocOpen">
            <toc :links="doc.body.toc.links" />
            <hr>
          </div>
        </div>

        <ContentRenderer
          :value="doc"
        />
      </template>
    </ContentDoc>
  </div>
</template>

<script>
import PostHeader from '../../components/PostHeader.vue'

export default {
  data() {
    return {
      isTocOpen: false,
    }
  },
  methods: {
    toggleToc() {
      this.isTocOpen = !this.isTocOpen
    },
  },
}
</script>

<style scoped>
:deep(li) {
  margin-bottom: 0.4rem;
  margin-left: 2rem;
  list-style: square;
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
  transition: opacity 0.2s;
}
</style>
