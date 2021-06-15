/*
 * @Description: 该文件是为了按需加载，剔除掉了一些不需要的框架组件。减少了编译支持库包大小;当需要更多组件依赖时，在该文件加入即可
 * @Author: zhangweigang
 * @Date: 2021-05-22 09:50:38
 * @LastEditTime: 2021-06-11 14:14:53
 * @LastEditors: zhangweigang
 */
import Vue from 'vue';

// 基础库
import { ConfigProvider, Layout, Input, InputNumber, Button, Switch, Radio, Checkbox, Select, Card, Form, Row, Col, Modal, Table, Tabs, Icon, Badge, Popover, Dropdown, List, Avatar, Breadcrumb, Steps, Spin, Menu, Drawer, Tooltip, Alert, Tag, Divider, DatePicker, TimePicker, Upload, Progress, Skeleton, Popconfirm, PageHeader, Result, Statistic, Descriptions, message, Tree, Space, Cascader, Collapse, FormModel, Affix, Pagination, AutoComplete, Mentions, Rate, Slider, Transfer, TreeSelect, Calendar, Carousel, Comment, Empty, Timeline, Anchor, BackTop } from 'ant-design-vue';

import PageLoading from '../components/PageLoading';
import Dialog from '../components/Dialog';

Vue.use(ConfigProvider);
Vue.use(Layout);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Button);
Vue.use(Switch);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Card);
Vue.use(Form);
Vue.use(Row);
Vue.use(Col);
Vue.use(Modal);
Vue.use(Table);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(Badge);
Vue.use(Popover);
Vue.use(Dropdown);
Vue.use(List);
Vue.use(Avatar);
Vue.use(Breadcrumb);
Vue.use(Steps);
Vue.use(Spin);
Vue.use(Menu);
Vue.use(Drawer);
Vue.use(Tooltip);
Vue.use(Alert);
Vue.use(Tag);
Vue.use(Divider);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Skeleton);
Vue.use(Popconfirm);
Vue.use(PageHeader);
Vue.use(Result);
Vue.use(Statistic);
Vue.use(Descriptions);
Vue.use(Tree);
Vue.use(Space);
Vue.use(Cascader);
Vue.use(FormModel);
Vue.use(Collapse);
Vue.use(Affix);
Vue.use(Pagination);
Vue.use(AutoComplete);
Vue.use(Mentions);
Vue.use(Rate);
Vue.use(Slider);
Vue.use(Transfer);
Vue.use(TreeSelect);
Vue.use(Calendar);
Vue.use(Carousel);
Vue.use(Comment);
Vue.use(Empty);
Vue.use(Timeline);
Vue.use(Anchor);
Vue.use(BackTop);

Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;
// Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;

Vue.use(PageLoading);
Vue.use(Dialog);

process.env.NODE_ENV !== 'production' && console.warn('antd-pro: Antd lazy_use');
