/**
 * webpack.config.js webpack 的配置文件
 *   
 */

 const {resolve} = require('path')

 const HtmlWebpackPlugin = require('html-webpack-plugin')
 const MiniCsExtractPlugin = require('mini-css-extract-plugin')
 const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

 process.env.NODE_ENV = 'development'

module.exports = {
  // webpack 配置
  entry: './src/index.js',
  output: {
    filename: 'build.js',

    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { //
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env']
        }
      },
      // { // eslint-disable-next-line
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: {
      //     // fix: true
      //   }
      // },
      {
        test: /\.less$/i,
        // 会在js 中创建 style 标签
        // use: ['style-loader', 'css-loader', 'less-loader'],
        use: [MiniCsExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.css$/i,
        // use: ['style-loader', 'css-loader'],
        use: [
          MiniCsExtractPlugin.loader, 'css-loader', 
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => {
                require('postcss-preset-env')()
              }
            }
          }
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024, 
          esModule: false,
          name: '[hash:10].[ext]',
          outputPath: 'img'
        }
      },
      {
        test: /\.html$/,
        // 处理html文件的 img 图片 (负责img 的src)
        loader: 'html-loader',
      },
      {
        exclude: /\.(css|js|html|less|png|jpg|jpeg|gif)/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]'
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new MiniCsExtractPlugin({filename: 'css/index.css'}),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: 'development',
  // mode: 'production',

  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true,
  }
}