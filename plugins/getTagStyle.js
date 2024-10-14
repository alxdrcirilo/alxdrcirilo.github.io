export default defineNuxtPlugin(() => {
  const colormap = {
    field: "tomato",
    language: "olivedrab",
    type: "teal",
  }
  return {
    provide: {
      getTagStyle: (property) => ({
        backgroundColor: colormap[property],
        borderRadius: "4px",
        color: "whitesmoke",
        fontSize: "11px",
        marginRight: "10px",
      })
    }
  }
})