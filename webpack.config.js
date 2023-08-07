const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  const isAnalyze = Boolean(env?.analyze)
  const config = {
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        '@pages': path.resolve(__dirname, './src/pages'),
        '@components': path.resolve(__dirname, './src/components'),
        '@context': path.resolve(__dirname, './src/context'),
        '@reducers': path.resolve(__dirname, './src/reducers'),
        '@constants': path.resolve(__dirname, './src/constants'),
        '@helpers': path.resolve(__dirname, './src/helpers'),
        '@assets': path.resolve(__dirname, './src/assets')
      }
    },
    entry: path.resolve(__dirname, 'src/index.tsx'),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(s[ac]ss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [['postcss-preset-env', {}]]
                }
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline'
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    devServer: {
      hot: true,
      port: 3000,
      historyApiFallback: true,
      static: {
        directory: path.resolve(__dirname, 'public', 'index.html'),
        serveIndex: true,
        watch: true
      }
    },
    devtool: isProduction ? false : 'source-map',
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction ? 'static/css/[name].[contenthash:6].css' : '[name].css'
      }),
      new Dotenv(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            to: '.',
            filter: (name) => {
              return !name.endsWith('index.html')
            }
          }
        ]
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        filename: 'index.html'
      }),
      new ESLintPlugin({
        extensions: ['.tsx', '.ts', '.js', '.jsx']
      })
    ]
  }
  if (isProduction) {
    config.plugins = [
      ...config.plugins,
      new webpack.ProgressPlugin(),
      new CompressionPlugin({
        test: /\.(css|js)$/,
        algorithm: 'brotliCompress'
      }),
      new CleanWebpackPlugin()
    ]
    if (isAnalyze) {
      config.plugins = [...config.plugins, new BundleAnalyzerPlugin()]
    }
    config.optimization = {
      minimizer: [`...`, new CssMinimizerPlugin()]
    }
  }
  return config
}
