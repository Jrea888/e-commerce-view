/*
 * @Description: 商品中心接口请求
 * @Author: zhangweigang
 * @Date: 2021-05-28 21:29:07
 * @LastEditTime: 2021-06-23 22:42:13
 * @LastEditors: zhangweigang
 */
import { request } from './index.js';
// import qs from 'qs';
// 代理跟路径
const api = '/api';

const commerceInfoAipService = {
  // 添加分类
  getAddCateData(spProductCategoryReq) {
    return request({
      url: api + '/rest/product/category/create',
      method: 'POST',
      data: spProductCategoryReq
    });
  },
  // 获取分类树
  getClassificTree() {
    return request({
      url: api + '/rest/product/category/tree',
      method: 'GET'
    });
  },
  // 分页查询商分类
  getPagQueryProSubCate(params) {
    return request({
      url: api + '/rest/product/category/list',
      method: 'GET',
      params: params
    });
  },
  // 导航栏显示状态
  getChangeNavBarStatus(params) {
    return request({
      url: api + '/rest/product/category/update/isNav?isNav=' + params.isNav,
      method: 'PUT',
      data: params.idList
    });
  },
  // 商品类目是否启用
  getChangeProCateIsEnable(params) {
    return request({
      url: api + '/rest/product/category/update/enable?enable=' + params.enable,
      method: 'PUT',
      data: params.idList
    });
  },
  // 删除商品分类
  getDeleteProCateById(params) {
    return request({
      url: api + '/rest/product/category/deleteById?id=' + params.id,
      method: 'DELETE',
      data: params
    });
  },
  // 批量删除商品分类
  getBatchDeleteProCate(params) {
    return request({
      url: api + '/rest/product/category/deleteBatch',
      method: 'DELETE',
      data: params
    });
  },
  // 根据id获取商品分类
  getAddroCommClassById(params) {
    return request({
      url: api + '/rest/product/category/getById',
      method: 'GET',
      params: params
    });
  },
  //
  // 修改商品分类
  modifyProductCategory(spProductCategoryReq) {
    return request({
      url: api + '/rest/product/category/update',
      method: 'PUT',
      data: spProductCategoryReq
    });
  },

  // --商品类型--新增属性分类
  getNewAddAttClassific(params) {
    return request({
      url: api + '/rest/productAttributeCategory/create',
      method: 'POST',
      data: params
    });
  },
  // 批量删除删除商品属性分类
  getBatchDeleteAttClassific(params) {
    return request({
      url: api + '/rest/productAttributeCategory/deleteBatch',
      method: 'DELETE',
      data: params
    });
  },
  // 删除商品属性分类
  getDeleteAttById(params) {
    return request({
      url: api + '/rest/productAttributeCategory/deleteById?id=' + params.id,
      method: 'DELETE',
      data: params
    });
  },
  // 根据ID获取商品属性分类信息
  getProAttClassificToId(params) {
    return request({
      url: api + '/rest/productAttributeCategory/getById',
      method: 'GET',
      params: params
    });
  },
  // 分页获取所有商品属性分类
  getAllProAttClassificByPage(params) {
    return request({
      url: api + '/rest/productAttributeCategory/page',
      method: 'GET',
      params: params
    });
  },
  // 修改商品属性分类
  getModifyProAttClassific(params) {
    return request({
      url: api + '/rest/productAttributeCategory/updateById',
      method: 'PUT',
      data: params
    });
  }

  // http://localhost:8888/rest/product/category/list?current=1&parentId=1&size=15
};

export default commerceInfoAipService;
