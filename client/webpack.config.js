let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let webpack = require('webpack')

module.exports = {
  context: __dirname,
  resolve: {
    extensions: ['.js', '.ts']
  },
  entry: {
    app: './src/index.tsx'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true
        }
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader?sourceMap'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/img/[name].[ext]?[hash]'
        }
      }
    ]
  },
  // For development https://webpack.js.org/configuration/devtool/#for-development
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    noInfo: true
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}
