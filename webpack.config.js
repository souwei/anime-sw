// __dirname
var path = require('path');
//looks for entry filename - starting point
//scans content for require and imports
//bundles everything to a destination you specify
//that bundled file is what you add witha  script tag
//if entry app is not specified and left as ./app, it will look for index.js

//modules rules for translations
const config = {
  entry: {
    app: './src'
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader']
    }
  ]
  },

  output: {
    path: path.join(__dirname, 'views/js'),
    filename: 'bundle.js'
  }
}


module.exports = config;
