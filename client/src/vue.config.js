module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/cookingscribe/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/_variables.scss";',
      },
    },
  },
}
