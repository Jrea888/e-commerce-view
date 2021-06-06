/*
 * @Description:
 * @Author: zhangweigang
 * @Date: 2021-05-18 00:10:23
 * @LastEditTime: 2021-05-22 11:02:18
 * @LastEditors: zhangweigang
 */

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry', // 按需引入 polyfill
        corejs: 3
      }
    ]
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: 'css' // `style: true` 会加载 less 文件
      }
    ]
  ]
};
