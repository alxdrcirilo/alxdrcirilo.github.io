export default defineNuxtPlugin(() => {
  const abbreviations = ["dyi"];
  return {
    provide: {
      isAbbreviation: (property) => abbreviations.includes(property)
    }
  }
})
