<template>
  <div>
    <h1>🏷️ Tags</h1>
    <h4>
      Posts with tag:
      <strong v-if="$isAbbreviation(tag)" class="tag">{{ tag.toUpperCase() }}</strong>
      <strong v-else class="tag">{{ $capitalize(tag) }}</strong>
    </h4>
    <Articles />
  </div>
</template>

<script>
import Articles from "~/components/articles.vue";

export default {
  components: {
    Articles,
  },
  created() {
    // Get articles based on query (e.g. { language: python })
    this.param = this.$route.path.split("/").pop();
    this.tag = Object.keys(this.$route.query).pop();
  },
};
</script>

<style scoped>
.tag {
  align-items: center;
  background-color: rgba(210, 180, 140, 0.5);
  border-radius: 4px;
  font-size: 80%;
  padding: 4px;
}
</style>