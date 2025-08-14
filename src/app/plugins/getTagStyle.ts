export default defineNuxtPlugin(() => {
  return {
    provide: {
      getTagStyle: (property) => {
        const colormap = {
          field: "#435738",
          language: "#AD5656",
          type: "#BA9550",
        };
        return {
          backgroundColor: colormap[property],
          borderRadius: "4px",
          color: "whitesmoke",
          fontSize: "11px",
          marginRight: "10px",
        };
      },
    },
  };
});
