/*
 * @Description: Vue 修改或添加配置
 * @Author: zhangweigang
 * @Date: 2021-05-19 15:34:27
 * @LastEditTime: 2021-06-06 11:53:51
 * @LastEditors: zhangweigang
 */
module.exports = {
  // eslint 验证
  lintOnSave: 'default',
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,
  // 是否开启 source map
  productionSourceMap: true,
  css: {
    loaderOptions: {
      less: { javascriptEnabled: true } // 开启后 antd 样式 可以引用.less文件,解决引入less报错问题
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
  }
  // devServer: {
  //   proxy: {
  //     // 目的是为了将/api替换成服务器地址
  //     target: '',
  //     // 将host设置成target ip
  //     changeOrigin: true,
  //     // 代理允许请求post
  //     headers: {
  //       host: 'XXX', // 远端服务器地址
  //       origin: 'XXX'
  //     },
  //     // 重写并替换原路径中的 api/
  //     pathRewrite: {
  //       '^api/': '/'
  //     }
  //   }
  // }
};
