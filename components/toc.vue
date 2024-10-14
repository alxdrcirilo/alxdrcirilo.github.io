<template>
  <nav class="toc">
    <header class="toc-header">
      <h3 class="text-xl font-bold">Table of contents</h3>
    </header>
    <ul class="toc-links">
      <li v-for="link of flattenLinks(links)" :key="link.id" :class="`toc-link _${link.depth}`">
        {{ link.enumeration }}) <a :href="`#${link.id}`" :style="`padding: ${(link.depth - 2) * 4}%`">{{ link.text
          }}</a>
        <template v-if="link.children">
          <ul>
            <li v-for="childLink in link.children" :key="childLink.id">
              {{ childLink.enumeration }}) <a :href="`#${childLink.id}`">{{ childLink.text }}</a>
              <template v-if="childLink.children">
                <ul>
                  <li v-for="grandChildLink in childLink.children" :key="grandChildLink.id">
                    {{ grandChildLink.enumeration }}) <a :href="`#${grandChildLink.id}`">{{ grandChildLink.text }}</a>
                  </li>
                </ul>
              </template>
            </li>
          </ul>
        </template>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  links: {
    type: Array,
    required: true,
  },
});

const flattenLinks = (links, parentEnumeration = []) => {
  const _links = links
    .map((link, index) => {
      const linkEnumeration = [...parentEnumeration, index + 1];
      const _link = {
        ...link,
        enumeration: linkEnumeration.join("."),
      };
      if (link.children) {
        const flattened = flattenLinks(link.children, linkEnumeration);
        _link.children = flattened;
      }
      return _link;
    })
  return _links;
};
</script>

<style scoped>
a, li {
  color: inherit;
  font-size: 1.15rem;
  font-weight: inherit;
  text-decoration: none;
}

.dark-mode a, li {
  color: inherit;
  font-weight: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
