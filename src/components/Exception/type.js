/*
 * @Description:
 * @Author: zhangweigang
 * @Date: 2021-06-18 14:54:36
 * @LastEditTime: 2021-06-18 15:05:02
 * @LastEditors: zhangweigang
 */
import exp_500 from 'assets/exception/500.svg';
import exp_404 from 'assets/exception/404.svg';
import exp_403 from 'assets/exception/404.svg';

const types = {
  403: {
    img: exp_403,
    title: '403',
    desc: '抱歉，你无权访问该页面'
  },
  404: {
    img: exp_404,
    title: '404',
    desc: '抱歉，你访问的页面不存在或仍在开发中'
  },
  500: {
    img: exp_500,
    title: '500',
    desc: '抱歉，服务器出错了'
  }
};
export default types;
