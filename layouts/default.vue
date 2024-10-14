<template>
  <div>
    <title>{{ author }}</title>
    <div class="container">
      <div class="row">
        <div class="three columns" align="center">
          <header>
            <!-- Avatar -->
            <NuxtImg id="avatar" name="avatar" alt="Hi, that's me!" src="avatar.png" />
            <!-- Metadata -->
            <p id="name">{{ author }}</p>
            <p id="bio">{{ bio }}</p>
            <!-- Socials -->
            <div id="socials">
              <a id="github-icon" name="github icon" href="https://github.com/alxdrcirilo" target="_blank" rel="icon"
                class="fab fa-github icon" />
              <a id="instagram-icon" name="instagram icon" href="https://www.instagram.com/alxdrcirilo/" target="_blank"
                rel="icon" class="fab fa-instagram icon" />
              <a id="linkedin-icon" name="linked icon" href="https://www.linkedin.com/in/alxdrcirilo/" target="_blank"
                rel="icon" class="fab fa-linkedin icon" />
            </div>
            <!-- Utils -->
            <div>
              <a rel="icon" :class="themeIcon" class="icon util-icon" @click="switchTheme" />
              <a href="/cv.pdf" name="cv icon" rel="icon" class="fas fa-file icon util-icon" />
              <a href="/rss.xml" name="rss icon" rel="icon" class="fas fa-rss icon util-icon" />
            </div>
            <!-- Buttons -->
            <hr class="delimiter">
            <nav>
              <ul>
                <li>
                  <NuxtLink id="nav-button" to="/">Home</NuxtLink>
                </li>
                <li>
                  <NuxtLink id="nav-button" to="/archive">Archive</NuxtLink>
                </li>
                <li>
                  <NuxtLink id="nav-button" to="/tags">Tags</NuxtLink>
                </li>
              </ul>
            </nav>
            <hr class="delimiter">
          </header>
        </div>
        <div class="nine columns">
          <!-- Slot -->
          <slot />
          <!-- Footer -->
          <footer>
            <hr style="margin-bottom: 20px;">
            © 2024 Alexandre Cirilo. Powered by <a href="https://nuxt.com/"><strong>Nuxt</strong></a>.
          </footer>
        </div>
      </div>
    </div>
  </div>
  <!-- Include Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      author: "Alexandre Cirilo",
      bio: "Software engineer based in Amsterdam, the Netherlands.",
      isDarkTheme: null,
      themeIcon: "fas fa-moon",
    };
  },
  mounted() {
    // Set proper themeIcon after mounting
    this.isDarkTheme = this.$colorMode.preference === "dark";
    this.themeIcon = this.isDarkTheme ? "fas fa-sun" : "fas fa-moon";
  },
  methods: {
    switchTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      this.$colorMode.preference = this.isDarkTheme ? "dark" : "light";
      this.themeIcon = this.isDarkTheme ? "fas fa-sun" : "fas fa-moon";
    },
  },
};
</script>

<style>
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.delimiter {
  border: 0.5px dashed #555;
  width: 60%;
}

.chip {
  background: #a0c8fa1a;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  margin: 0 0.2rem;
  padding: 0.2rem 0.5rem;
}

.chip:hover {
  opacity: 0.7;
}

.tags {
  display: inline-block;
  padding-bottom: 4px;
}
</style>
