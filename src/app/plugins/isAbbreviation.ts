export default defineNuxtPlugin(() => {
  return {
    provide: {
      isAbbreviation: (property: string) => {
        const abbreviations = ["dyi"];
        return abbreviations.includes(property);
      },
    },
  };
});
