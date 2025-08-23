<template>
  <div>
    <PostHeader
      :title="post.title"
      :description="post.description"
      :repo="post.repo"
      :date="post.date"
      :readtime="post.readtime"
      :tags="post.tags"
    />
    <ContentRenderer :value="post" />
  </div>
</template>

<script setup lang="ts">
const slug = useRoute().params.slug;
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection("content").path(`/blog/${slug}`).first();
});
</script>

<style scoped>
:deep(li) {
  margin-bottom: 0.4rem;
  margin-left: 2rem;
  list-style: square;
}

:deep(.footnotes) {
  margin-top: 20px;
  padding-top: 12px;
  width: fit-content;
}

/* Hide footnote label */
:deep(#footnote-label) {
  display: none;
}

/* Add custom footnote label */
:deep(.footnotes::before) {
  border-bottom: 1px dotted;
  content: "References";
  display: block;
  font-size: 1.1rem;
  margin-bottom: 12px;
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
