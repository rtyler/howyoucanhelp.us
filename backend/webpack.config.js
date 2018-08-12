const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/pwa/index.ts',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          useCache: true,
        }
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      excludeChunks: [
      ],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
  },
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
  }
};

