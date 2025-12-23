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
              class="avatar"
              alt="Hi, that's me!"
              src="/avatar.png"
              format="webp"
            />

            <!-- Metadata -->
            <p class="name">{{ author }}</p>
            <p class="bio">{{ bio }}</p>

            <div class="icons">
              <!-- Socials -->
              <nav aria-label="Social media links">
                <div class="socials">
                  <a
                    href="https://github.com/alxdrcirilo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                  >
                    <Icon class="icon github-icon" name="fa6-brands:github" />
                  </a>
                  <a
                    href="https://www.instagram.com/alxdrcirilo/"
                    target="_blank"
                    rel="noopener noreferrer"
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
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                  >
                    <Icon
                      class="icon linkedin-icon"
                      name="fa6-brands:linkedin"
                    />
                  </a>
                </div>
              </nav>

              <!-- Utils -->
              <nav aria-label="Utility links">
                <div class="utils">
                  <a
                    @click="switchTheme"
                    aria-label="Toggle theme"
                    role="button"
                  >
                    <Icon
                      class="icon util-icon"
                      :name="
                        colorMode.preference === 'dark'
                          ? 'fa6-solid:sun'
                          : 'fa6-solid:moon'
                      "
                    />
                  </a>
                  <a
                    href="/cv.pdf"
                    aria-label="Curriculum vitae"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon class="icon util-icon" name="fa6-solid:file" />
                  </a>
                  <a
                    href="/rss.xml"
                    aria-label="RSS feed"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon class="icon util-icon" name="fa6-solid:rss" />
                  </a>
                </div>
              </nav>
            </div>

            <!-- Navigation -->
            <hr class="delimiter" />
            <nav aria-label="Main navigation">
              <ul>
                <li>
                  <NuxtLink to="/" aria-label="Go to home page">Home</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/archive" aria-label="View blog archive"
                    >Archive</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/tags" aria-label="Browse by tags"
                    >Tags</NuxtLink
                  >
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

const author = "Alexandre Cirilo";
const bio = "Software engineer based in Amsterdam, the Netherlands.";

const currentYear = computed(() => new Date().getFullYear());

const switchTheme = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};
</script>

<style>
blockquote {
  border-left: 1.5px solid #444;
  color: #444;
  padding-left: 20px;
  text-align: left;
  position: relative;
}

footer,
footer > a {
  font-size: 1.1rem;
  text-align: center;
}

nav {
  display: flex;
  justify-content: center;
}

nav ul li a {
  font-weight: 600;
}

nav ul {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
}

sup {
  font-size: 0.8rem;
  font-weight: bolder;
  padding-left: 2px;
}

sup > a {
  font-size: 0.9rem;
}

.avatar {
  border-radius: 30px;
  margin-bottom: 20px;
  width: 75%;
}

.bio {
  font-size: 95%;
  text-align: center;
  width: 80%;
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

.delimiter {
  border: 0.5px dashed #555;
  margin: 24px 0;
  width: 60%;
}

.footer-divider {
  margin-bottom: 20px;
  opacity: 0.5;
}

.github-icon:hover,
.dark-mode .github-icon:hover {
  color: dimgray;
}

.icon {
  height: 18px;
  margin: 0 12px;
  transition: color 0.2s;
  width: 18px;
}

.icon:hover {
  opacity: 0.5;
}

.icons {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0;
}

.instagram-icon:hover,
.dark-mode .instagram-icon:hover {
  color: mediumvioletred;
}

.linkedin-icon:hover,
.dark-mode .linkedin-icon:hover {
  color: steelblue;
}

.name {
  font-family: "Fira Mono", "Menlo", "Monaco", "Consolas", monospace;
  font-size: medium;
  font-weight: bolder;
  text-align: center;
  width: 80%;
}

.socials {
  padding: 6px 0;
  text-align: center;
}

.utils {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

.util-icon {
  cursor: pointer;
  opacity: 0.7;
}

.dark-mode blockquote {
  color: #999;
}

.dark-mode footer > p > a {
  color: #cecece;
}

.dark-mode .icon {
  color: whitesmoke;
}

@media (max-width: 550px) {
  .avatar {
    width: 50%;
  }
}
</style>
