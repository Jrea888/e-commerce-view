/*
 * @Description: 请求配置文件
 * @Author: zhangweigang
 * @Date: 2021-05-28 21:29:07
 * @LastEditTime: 2021-05-28 21:30:25
 * @LastEditors: zhangweigang
 */
import { request } from './index.js';
import qs from 'qs';
// 代理跟路径
const api = '/api';

const commerceInfoAipService = {
  // 管理员注册
  adminRegisterInfo(params) {
    return request({
      url: api + '/users',
      method: 'POST',
      data: params
    });
  }
};

export default commerceInfoAipService;
