const path = require('path');

module.exports = {
  entry: './src/TimerSDK.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname),  // 静态文件路径
    },
    compress: true,
    port: 9000,  // 本地服务器端口
  },
  mode: 'development',  // 开发模式
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'TimerSDK',  // 生成的库名称
    libraryTarget: 'umd',  // 生成的库格式，使其可以被直接引入到浏览器中
    globalObject: 'this',  // 解决UMD构建时的全局对象问题
  },
} 