const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const defaultEnv = { PUBLIC_URL: '' };

module.exports = (env = defaultEnv) => merge([{
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      _Utils_: path.resolve(__dirname, '../src/utilities/'),
      _Hocs_: path.resolve(__dirname, '../src/hocs/'),
      _Ui_: path.resolve(__dirname, '../src/components/UI'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, '../public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ 'process.env.PUBLIC_URL': JSON.stringify(env.PUBLIC_URL) }),
  ],
}]);
