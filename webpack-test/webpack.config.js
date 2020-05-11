/**
 * webpack.config.js webpack 的配置文件
 *   
 */

 const {resolve} = require('path')

 const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  // webpack 配置
  entry: './src/index.js',
  output: {
    filename: 'build.js',

    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
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
    new HtmlWebpackPlugin({template: './src/index.html'})
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