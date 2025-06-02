const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const outputDirectory = process.env.OUTPUT_DIR || path.join(__dirname, 'dist');
const config = {
  entry: {
    main: './src/index.js',
    vendor: ['react', 'lodash/core']
  },
  output: {
    path: outputDirectory,
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080'
    },
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new FaviconsWebpackPlugin({
    logo: './public/yogi.jpg',
    icons: {
      android: false,
      appleIcon: false,
      appleStartup: false,
      coast: false,
      favicons: true,
      firefox: false,
      windows: false,
      yandex: false
    }
  }));
  config.plugins.push(new CleanWebpackPlugin([outputDirectory]));
  config.plugins.push(new UglifyJSPlugin());
  config.plugins.push(new CompressionPlugin());
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }));
  config.optimization = {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  };
}

module.exports = config;
