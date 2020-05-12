const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//  process.env.NODE_ENV = 'development'
process.env.NODE_ENV = 'production'

const commonCssLoader = [
  // {
  //   loader: MiniCssExtractPlugin.loader,
  //   options: {
  //     publicPath: '../'
  //   }
  // }, 
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-preset-env')()
      ]
    }
  }
]
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: commonCssLoader
      },
      {
        test: /\.less$/,
        use: [ ...commonCssLoader, 'less-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          // fix: true,
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: {version: 3},
                targets: {
                  chrome: '60',
                  firefox: '50'
                }
              }
            ]
          ]
        }
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
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.css',

    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: process.env.NODE_ENV,

}