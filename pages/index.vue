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
    personal projects, interests, <NuxtLink to="https://alxdrcirilo.dev/games">
      video game reviews</NuxtLink>, and random things that strike my
    interest.
  </p>
  <div>
    Recent posts:
    <ContentList
      v-slot="{ list }"
      path="/blog"
      :query="{ sort: [{ date: -1 }], limit: 5 }"
    >
      <ul
        v-for="article in list"
        :key="article._path"
      >
        <li>
          <NuxtLink
            :to="`${article._path}`"
            class="article-title"
          >
            {{ article.title }} ({{ article.date }})
          </NuxtLink>
        </li>
      </ul>
    </ContentList>
  </div>
</template>

<style scoped>
ul {
  display: block;
  list-style-type: square;
  margin: 0;
  padding-inline-start: 24px;
}

li {
  display: list-item;
  text-align: match-parent;
  padding: 1px;
  margin: 0;
}

li>a,
.dark-mode li>a {
  color: inherit;
  text-decoration: inherit;
  font-weight: inherit;
}

li>a:hover,
.dark-mode li>a:hover {
  text-decoration: underline;
}
</style>
