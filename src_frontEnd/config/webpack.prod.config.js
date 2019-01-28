const merge = require('webpack-merge');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const baseConfig = require('./webpack.base.config');


const prodConfiguration = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: './index.html',
        inject: true,
        minify: {
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          minifyCSS: true,
          minifyURLs: true,
          minifyJS: true,
          removeComments: true,
          removeRedundantAttributes: true,
        },
      }),
      new BundleAnalyzerPlugin(),
    ],
    output: {
      filename: 'static/[name].js',
      path: path.resolve(__dirname, '../dist/'),
      publicPath: '',
    },
  },
};

// module.exports = env => {
//   return merge(baseConfig(env), prodConfiguration);
// }
module.exports = env => merge(baseConfig(env), prodConfiguration);

