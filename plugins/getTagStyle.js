export default defineNuxtPlugin(() => {
  const colormap = {
    field: '#435738',
    language: '#AD5656',
    type: '#BA9550',
  }

  return {
    provide: {
      getTagStyle: property => ({
        backgroundColor: colormap[property],
        borderRadius: '4px',
        color: 'whitesmoke',
        fontSize: '11px',
        marginRight: '10px',
      }),
    },
  }
})
