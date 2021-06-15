/*
 * @Description: 商品中心接口请求
 * @Author: zhangweigang
 * @Date: 2021-05-28 21:29:07
 * @LastEditTime: 2021-06-15 17:31:36
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
