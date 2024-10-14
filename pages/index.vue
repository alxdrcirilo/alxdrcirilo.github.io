<template>
  <h1>Hi, I'm Alex 👋</h1>
  <p>
    I'm a Software Engineer based in Amsterdam, the Netherlands. Welcome to my
    personal playground! This blog is my space to geek out about all things
    computer science, share my coding adventures, and showcase my personal
    projects. 🚀
  </p>
  <p>
    I plan to use this space to make occasional posts about the development of
    personal projects, interests, and random things that strike my interest.
  </p>
  <p>
    You can find me around the interwebz with
    <code class="chip" style="border: 1px solid #768a54; cursor: default;">@alxdrcirilo</code>.
  </p>
  <br>
  <div>
    Recent posts:
    <ContentList v-slot="{ list }" :path="`/blog/${year}`" :query="{ sort: [{ date: -1 }], limit: 5 }">
      <ul v-for="article in list" :key="article._path">
        <li>
          <NuxtLink :to="`${article._path}`" class="article-title">{{ article.title }} ({{ article.date }})</NuxtLink>
        </li>
      </ul>
    </ContentList>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: 2024
    }
  }
}
</script>

<style scoped>
ul {
  display: block;
  list-style-type: disc;
  margin-block-end: 1em;
  margin-block-start: 1em;
  padding: 0;
  margin: 0;
  padding-inline-start: 40px;
}

li {
  display: list-item;
  text-align: match-parent;
  padding: 1px;
  margin: 0
}

li > a,
.dark-mode li > a {
  color: inherit;
  text-decoration: inherit;
  font-weight: inherit;
}

li > a:hover,
.dark-mode li > a:hover {
  text-decoration: underline;
}
</style>
