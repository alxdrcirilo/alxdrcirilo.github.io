<template>
  <div>
    <Head>
      <Title>{{ author }}</Title>
    </Head>

    <div class="container">
      <div class="row">
        <div class="three columns" align="center">
          <header>
            <!-- Avatar -->
            <NuxtImg
              id="avatar"
              alt="Hi, that's me!"
              src="/avatar.png"
              format="webp"
            />

            <!-- Metadata -->
            <p id="name">{{ author }}</p>
            <p id="bio">{{ bio }}</p>

            <div id="icons">
              <!-- Socials -->
              <div id="socials">
                <a
                  href="https://github.com/alxdrcirilo"
                  target="_blank"
                  aria-label="GitHub profile"
                >
                  <Icon class="icon github-icon" name="fa6-brands:github" />
                </a>
                <a
                  href="https://www.instagram.com/alxdrcirilo/"
                  target="_blank"
                  aria-label="Instagram profile"
                >
                  <Icon
                    class="icon instagram-icon"
                    name="fa6-brands:instagram"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/alxdrcirilo/"
                  target="_blank"
                  aria-label="LinkedIn profile"
                >
                  <Icon class="icon linkedin-icon" name="fa6-brands:linkedin" />
                </a>
              </div>

              <!-- Utils -->
              <div id="utils">
                <button
                  @click="switchTheme"
                  aria-label="Toggle theme"
                  class="theme-toggle"
                >
                  <Icon
                    class="icon util-icon"
                    :name="
                      colorMode.preference === 'dark'
                        ? 'fa6-solid:sun'
                        : 'fa6-solid:moon'
                    "
                  />
                </button>
                <a href="/cv.pdf" aria-label="Curriculum vitae" target="_blank">
                  <Icon class="icon util-icon" name="fa6-solid:file" />
                </a>
                <a href="/rss.xml" aria-label="RSS feed" target="_blank">
                  <Icon class="icon util-icon" name="fa6-solid:rss" />
                </a>
              </div>
            </div>

            <!-- Navigation -->
            <hr class="delimiter" />
            <nav>
              <ul>
                <li>
                  <NuxtLink to="/">Home</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/archive">Archive</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/tags">Tags</NuxtLink>
                </li>
              </ul>
            </nav>
            <hr class="delimiter" />
          </header>
        </div>

        <main class="nine columns">
          <slot />

          <footer>
            <hr class="footer-divider" />
            © 2024 - {{ currentYear }} {{ author }}. Powered by
            <a href="https://nuxt.com" target="_blank" class="nuxt-link">Nuxt</a
            >.
          </footer>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
const colorMode = useColorMode();

// Constants
const author = "Alexandre Cirilo";
const bio = "Software engineer based in Amsterdam, the Netherlands.";

// Computed properties
const currentYear = computed(() => new Date().getFullYear());

/**
 * Toggles the theme preference between 'dark' and 'light' modes.
 */
const switchTheme = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
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
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.1rem 0.4rem;
}

.chip:hover {
  opacity: 0.7;
  transition: opacity 0.2s;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.footer-divider {
  margin-bottom: 20px;
}

.utils {
  margin: 0;
}
</style>
