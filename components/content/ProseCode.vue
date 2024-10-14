<template>
  <div class="pre-container">
    <section v-if="props.language && props.filename" class="pre-header">
      <span :class="`fab fa-${props.language} fa-lg`" />
      <div v-if="showCopiedMessage" class="pre-header-text">Copied</div>
      <span v-if="!showCopiedMessage" class="pre-header-text">{{ props.filename ?
        props.filename : " " }}</span>
      <a class="fa-solid fa-copy fa-lg" @click="copyToClipboard" />
    </section>
    <hr v-if="props.filename" style="display: flex; margin: 0; opacity: 0.4;">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  code: {
    type: String,
    default: ""
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array,
    default: []
  }
})
</script>

<script>
export default {
  data() {
    return {
      showCopiedMessage: false
    };
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.code)
        .then(() => {
          this.showCopiedMessage = true;
          setTimeout(() => {
            this.showCopiedMessage = false;
          }, 3000);
        })
        .catch(err => {
          console.error("Failed to copy text: ", err);
        });
    }
  }
}
</script>

<style>
pre {
  white-space: nowrap;
  margin: 0 0.2rem;
}

pre>code {
  border-radius: 8px;
  border: none;
  display: block;
  overflow-x: auto;
  padding: 1rem 1.5rem;
  white-space: pre;
}

.dark-mode .pre>code {
  background: #282828;
}

.pre-container {
  background: #373737;
  border-radius: 8px;
  display: block;
  margin-bottom: 20px;
  overflow-x: auto;
  white-space: pre;
}

.dark-mode .pre-container {
  background: #373737;
  border: none;
}

.pre-header {
  align-items: center;
  background-color: #e2d9d4;
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 1rem;
}

.dark-mode .pre-header {
  background-color: #282828;
}

.pre-header-text {
  font-weight: bold;
}

.highlight {
  border-radius: 10px;
  border: 1px solid #e1e1e1;
  font-size: larger;
  max-width: fit-content;
}
</style>
