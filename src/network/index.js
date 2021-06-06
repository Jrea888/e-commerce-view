/*
 * @Description: 网络请求配置
 * @Author: meihangbo
 * @Date: 2021-03-21 11:40:06
 * @LastEditTime: 2021-05-28 21:28:15
 * @LastEditors: zhangweigang
 */
import Axios from 'axios';
import NProgress from 'nprogress';
import { Loading } from 'element-ui';

export function request(config) {
  // 1.创建对象
  const instance = Axios.create({
    timeout: 40000
  });
  let loadingInstance = null;
  Axios.defaults.withCredentials = true; // 请求前携带Cookie
  // 2.配置拦截器
  instance.interceptors.request.use(
    (config) => {
      NProgress.start();
      loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      console.log('###################################');
      console.log('请求链接:', config.url);
      console.log('请求方式:', config.method);
      console.log('请求参数:', config.params, config.data);
      return config;
    },
    (error) => {
      console.error(error, '请求拦截器错误信息！');
    }
  );
  // 拦截响应
  instance.interceptors.response.use(
    (response) => {
      NProgress.done();
      loadingInstance.close();
      console.log('------------------------');
      console.log('响应数据:', response.data);
      console.log('###################################');
      return response;
    },
    (error) => {
      console.error(error, '响应拦截错误信息！');
    }
  );
  // 3.发送真正的网络请求 返回 Axios promise
  return instance(config);
}
