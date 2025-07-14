<template>
  <div>
    <title>{{ author }}</title>
    <div class="container">
      <div class="row">
        <div
          class="three columns"
          align="center"
        >
          <header>
            <!-- Avatar -->
            <NuxtImg
              id="avatar"
              name="avatar"
              alt="Hi, that's me!"
              src="/avatar.png"
              format="webp"
            />
            <!-- Metadata -->
            <p id="name">
              {{ author }}
            </p>
            <p id="bio">
              {{ bio }}
            </p>
            <div id="icons">
              <!-- Socials -->
              <div id="socials">
                <a
                  id="github-icon"
                  name="github icon"
                  href="https://github.com/alxdrcirilo"
                  target="_blank"
                  rel="icon"
                  aria-label="GitHub profile"
                  class="fab fa-github icon"
                />
                <a
                  id="instagram-icon"
                  name="instagram icon"
                  href="https://www.instagram.com/alxdrcirilo/"
                  target="_blank"
                  rel="icon"
                  aria-label="Instagram profile"
                  class="fab fa-instagram icon"
                />
                <a
                  id="linkedin-icon"
                  name="linked icon"
                  href="https://www.linkedin.com/in/alxdrcirilo/"
                  target="_blank"
                  rel="icon"
                  aria-label="LinkedIn profile"
                  class="fab fa-linkedin icon"
                />
              </div>
              <!-- Utils -->
              <div id="utils">
                <a
                  rel="icon"
                  :class="themeIcon"
                  @click="switchTheme"
                />
                <a
                  href="/cv.pdf"
                  name="cv icon"
                  rel="icon"
                  aria-label="Curriculum vitae"
                  class="fas fa-file icon util-icon"
                />
                <a
                  href="/rss.xml"
                  name="rss icon"
                  rel="icon"
                  aria-label="RSS feed"
                  class="fas fa-rss icon util-icon"
                />
              </div>
            </div>
            <!-- Buttons -->
            <hr class="delimiter">
            <nav>
              <ul>
                <li>
                  <NuxtLink
                    id="nav-button"
                    to="/"
                  >
                    Home
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    id="nav-button"
                    to="/archive"
                  >
                    Archive
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    id="nav-button"
                    to="/tags"
                  >
                    Tags
                  </NuxtLink>
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
            © 2024 - {{ new Date().getFullYear() }} {{ author }}.
            Powered by <a href="https://nuxt.com" target="_blank" style="font-weight: bold;">Nuxt</a>.
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const colorMode = useColorMode()
const themeIcon = ref('fas fa-sun icon util-icon')

/**
 * Toggles the theme preference between 'dark' and 'light' modes.
 * Updates the theme icon accordingly.
 *
 * - If the current preference is 'dark', it changes to 'light' and sets the icon to a moon.
 * - If the current preference is 'light', it changes to 'dark' and sets the icon to a sun.
 */
const switchTheme = () => {
  if (colorMode.preference === 'dark') {
    colorMode.preference = 'light'
    themeIcon.value = 'fas fa-moon icon util-icon'
  }
  else {
    colorMode.preference = 'dark'
    themeIcon.value = 'fas fa-sun icon util-icon'
  }
}
</script>

<script>
export default {
  name: 'App',
  data() {
    return {
      author: 'Alexandre Cirilo',
      bio: 'Software engineer based in Amsterdam, the Netherlands.',
    }
  },
}
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
  padding: 0.2rem 0.5rem;
}

.chip:hover {
  opacity: 0.7;
  transition: opacity 0.2s;
}

footer {
  margin-bottom: 20px;
}
</style>
