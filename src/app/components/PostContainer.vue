<template>
  <div class="posts-container">
    <div class="year-container" v-for="year in years" :key="year">
      <div
        v-if="posts.some((post) => new Date(post.date).getFullYear() === year)"
      >
        <h2>
          {{ year }}
          <sup
            >({{
              posts.filter((post) => new Date(post.date).getFullYear() === year)
                .length
            }})</sup
          >
        </h2>
        <ul class="post-list">
          <li
            v-for="post in posts.filter(
              (post) => new Date(post.date).getFullYear() === year,
            )"
            :key="post.id"
          >
            <div class="post-section">
              <NuxtLink :to="post.path" class="post-title">
                {{ post.title }}
              </NuxtLink>
              <div class="post-readtime-date">
                <div class="post-readtime">
                  {{ post.readtime }}<Icon name="fa6-solid:clock" />
                </div>
                <div class="post-date">
                  {{ post.date }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const years = ref([2026, 2025, 2024]);

defineProps<{
  posts: Array<{
    id: string | number;
    title: string;
    date: string;
    path: string;
    readtime: string;
  }>;
}>();
</script>

<style scoped>
h2 {
  display: flex;
  align-items: flex-start;
  gap: 4px;
}

h2 sup {
  font-size: 1.1rem;
  opacity: 0.8;
  margin-left: 0;
}

.year-container {
  margin-bottom: 32px;
}

.post-list {
  list-style: square;
  margin-left: 24px;
  margin-right: 12px;
}

.post-section {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  padding-left: 2px;
}

.post-title {
  font-weight: bold;
}

.post-title:hover {
  text-decoration: underline;
}

.post-readtime {
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: 0.5;
  padding-right: 10px;
}

.post-readtime-date {
  display: flex;
  font-size: 1.1rem;
  opacity: 0.9;
  white-space: nowrap;
}
</style>
