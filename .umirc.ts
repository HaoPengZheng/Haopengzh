import { IConfig } from 'umi-types';

import path from 'path'
// import routes from './config/router.config'
// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  // externals:{
  //   "react":"window.React",
  //   "react-dom":"window,ReactDOM"
  // },
  // history: 'hash',
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
  routes: [{
    path: '/', component: '../layouts/index',
    routes: [
      { path: '/write',component:'./write'},
      {
      path:'/',component:'../layouts/base',
      routes:[
        { path: '/',component: './home'}, 
        { path: '/essay/:id',component: './essay'},
      ]},
      
    ],
  },
    
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      immer: true,
      dynamicImport: true,
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
      "pathRewrite": { "^/api": "/api" }
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
        {
          test: /\.css$/,
          use: [
             'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }
          ]
         }
      ],
    },
  },

}

export default config;
