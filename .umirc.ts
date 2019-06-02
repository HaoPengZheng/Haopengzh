import { IConfig } from 'umi-types';

import path from 'path'
// import routes from './config/router.config'
// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  alias:{
    '@': path.resolve(__dirname, './src'),
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      immer: true,
      dynamicImport: false,
      title: 'myapp',
      dll: false,
      
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  "proxy": {
    "/api": {
      "target": "http://haopengzh.cn:3001",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    module: {
      rules: [
        {
          test: /\.less$/,
          loader: 'less-loader', // compiles Less to CSS
        },
      ],
    },
  },
 
}

export default config;
