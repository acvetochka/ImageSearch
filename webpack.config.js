const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
    devServer: {
      static: path.join(__dirname, 'src'), // Замініть 'src' на шлях до вашої папки з HTML-файлом
      port: 8080, // Опціонально, можна змінити порт
      open: true // Опціонально, відкривати сторінку у браузері автоматично
    },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, 'src/css'),
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: path.resolve(__dirname, 'src/img'),
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]', // Вказуємо, щоб зображення зберігалися у папці images
        },
      },
    ],
  },
};
