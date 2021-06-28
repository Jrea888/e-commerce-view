/*
 * @Description: Vue 修改或添加配置
 * @Author: zhangweigang
 * @Date: 2021-05-19 15:34:27
 * @LastEditTime: 2021-06-27 10:38:57
 * @LastEditors: zhangweigang
 */
const isProd = process.env.NODE_ENV === 'production';
console.log(process.env.NODE_ENV, '环境');
console.log(process.env.VUE_APP_API_COMMERCE_URL, '文根');
module.exports = {
  publicPath: isProd ? './' : '',
  // eslint 验证
  lintOnSave: 'default',
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,
  // 是否开启 source map
  productionSourceMap: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true // 开启后 antd 样式 可以引用.less文件,解决引入less报错问题
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      // 配置别名
      alias: {
        assets: '@/assets',
        components: '@/components',
        network: '@/network',
        views: '@/views'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        // 此处的写法，目的是为了 将 /api 替换成 http://123.56.158.121:8888
        target: 'http://localhost:8888', // 代理地址
        changeOrigin: true,
        // 代理 配置允许post请求
        headers: {
          host: 'http://localhost:8888',
          origin: 'http://localhost:8888'
        },
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
};
