<template>
  <div class="pre-card">
    <div class="pre-card-header" v-if="props.filename">
      <Icon
        v-if="getLanguageIcon(props.language)"
        :name="getLanguageIcon(props.language)"
      />
      {{ props.filename }}
    </div>
    <div class="pre-card-content">
      <pre :class="props.class"><slot /></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  language?: string;
  filename?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  language: "",
  filename: "",
  class: "",
});

/**
 * Returns the appropriate Font Awesome icon class for the given language.
 * @param {string} lang - The programming language.
 * @returns {string} The Font Awesome icon class.
 */
const getLanguageIcon = (lang: string): string => {
  const iconMap: Record<string, string> = {
    js: "fa6-brands:js",
    json: "fa6-solid:file-code",
    makefile: "fa6-solid:file-lines",
    py: "fa6-brands:python",
    rs: "fa6-brands:rust",
    shell: "fa6-solid:terminal",
    toml: "fa6-solid:file-lines",
    xml: "fa6-solid:file-code",
  };
  return iconMap[lang] || "";
};
</script>

<style scoped>
.pre-card {
  border-radius: 8px;
  background: #fffaf7;
  margin: 28px 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition:
    color 0.2s,
    background-color 0.2s;
}

.pre-card-header {
  display: flex;
  align-items: center;
  background: #f0eae4;
  border-bottom: 1px solid #d6d3ce;
  opacity: 0.9;
  gap: 1rem;
  padding: 0.75rem 1rem;
  font-family: "Fira Mono", "Menlo", "Monaco", "Consolas", monospace;
  font-size: 1.15rem;
  font-weight: bold;
}

.pre-card-content {
  overflow-x: auto;
}

.pre-card pre {
  margin: 0;
  padding: 1.5rem;
  border-radius: 0;
}

.pre-card pre * {
  font-size: 1.15rem;
}

.dark-mode .pre-card {
  background: #2d2d2d;
  border-color: #44403c;
  color: #e7e5e4;
}

.dark-mode .pre-card-header {
  background: #282828;
  border-color: #8a8882;
}
</style>
