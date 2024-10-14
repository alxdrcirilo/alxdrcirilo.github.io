export default defineNuxtPlugin(() => {
  return {
    provide: {
      capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1)
    }
  }
})
