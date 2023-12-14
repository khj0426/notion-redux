const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // 개발 서버 설정. 빌드 결과물을 제공하는 디렉토리 지정
  mode: 'development',
  devServer: {
    historyApiFallback: {
      index: '/index.html',
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  // 엔트리 포인트 설정. 이 파일을 시작으로 엔트리 그래프를 만든다.
  entry: '/src/main.js',

  // 출력 설정. 빌드 결과물의 파일 이름과 저장 위치를 지정
  output: {
    publicPath: '/',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: {
      keep: /\.git/,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  // 플러그인 설정.
  // CleanWebpackPlugin은 빌드 전 output.path에 있는 파일들을 제거하고,
  // HtmlWebpackPlugin은 HTML 파일을 생성합니다.
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
