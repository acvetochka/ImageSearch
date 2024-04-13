const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      images: path.resolve(__dirname, 'src/assets/img/'),
    },
  },
  devServer: {
    static: path.join(__dirname, 'src'),
    port: 8080,
    open: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/img', to: 'images' },
        { from: 'src/index.html', to: 'index.html' },
        { from: 'src/css', to: 'css' },
      ],
    }),
  ],
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './src/index.html',
  //     filename: 'index.html', 
  //     inject: 'head',
  //   }),
  //   new MiniCssExtractPlugin({
  //     filename: 'css/styles.css', 
  //   })
  // ],
  module: {
    rules: [

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        include: path.resolve(__dirname, 'src/css'),
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: /node_modules/,
      },
      // {
      //   test: /\.css$/,
      //   // use: ['style-loader', 'css-loader'],
      //   include: path.resolve(__dirname, 'src/css'),
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'css/[name][ext]'
      //   }
      // },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: path.resolve(__dirname, 'src/img'),
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
};
