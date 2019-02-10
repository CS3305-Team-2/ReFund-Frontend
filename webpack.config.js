const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})


module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader?sourceMap',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [require('precss'), require('autoprefixer')]
              }
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: "url-loader"
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
};


