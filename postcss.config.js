module.exports = {
    plugins: [
      require('autoprefixer')({
        overrideBrowserslist: ['last 2 versions', 'ie > 8']
      }),
      require('css-mqpacker')({
        sort: true
      })
    ]
}