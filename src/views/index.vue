<!--
 * @Description:系统主页
 * @Author: zhangweigang
 * @Date: 2021-05-23 21:22:11
 * @LastEditTime: 2021-06-15 23:56:36
 * @LastEditors: zhangweigang
-->
<template>
  <div class="home_box">
    <div class="home-container">
      <div class="header cs_flex">
        <div class="logo_title">
          <img src="../assets/image/logo2.jpg" width="100" alt="" />
          <span>电商后台管理系统</span>
        </div>
        <div class="cs_info">
          <li @click="exitSystem">
            <i class="iconfont icon-tuichu"></i>
            <span>退出</span>
          </li>
          <li>
            <i class="iconfont icon-ren"></i>
            <span>个人中心</span>
          </li>
        </div>
      </div>
      <div class="main">
        <div class="cs_aside">
          <!-- 侧边栏   -->
          <a-menu theme="dark" :openKeys="openKeys" mode="inline" @openChange="onOpenChange" :defaultSelectedKeys="defaultSelectedKeys" style="width: 100%">
            <!-- 渲染菜单列表 -->
            <template v-for="item in menuList">
              <!-- 顶级菜单 -->
              <a-menu-item v-if="item.children === false" :key="item.router">
                <i :class="item.ico" class="cs_ico"></i>
                <span class="cs_text" v-if="item.router === '/index'" @click="goIndex(item.router)">{{ item.name }}</span>
                <span class="cs_text" v-else>{{ item.name }}</span>
              </a-menu-item>
              <!-- 可以展开的二级菜单 -->
              <a-sub-menu v-else :key="item.router">
                <span slot="title">
                  <i :class="item.ico" class="cs_ico"></i>
                  <span class="cs_text">{{ item.name }}</span>
                </span>
                <a-menu-item v-for="menuChildren in item.children" :key="menuChildren.router" @click="clickItem(menuChildren.router)">
                  <i :class="menuChildren.ico" class="cs_ico"></i>
                  <span class="cs_text">{{ menuChildren.name }}</span>
                </a-menu-item>
              </a-sub-menu>
            </template>
          </a-menu>
        </div>
        <div class="cs_content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          name: '首页',
          router: '/index',
          ico: 'iconfont icon-shouye',
          children: false
        },
        {
          name: '商品',
          ico: 'iconfont icon-shangpinzhongxin1',
          children: [
            {
              name: '商品分类',
              ico: 'iconfont icon-shangpinfenlei',
              router: '/productCategorg'
            },
            {
              name: '商品类型',
              ico: 'iconfont icon-shangpinleixing',
              router: '/productType'
            }
          ]
        },
        {
          name: '预留菜单',
          router: '',
          children: [
            {
              name: '预留菜单1',
              router: ''
            },
            {
              name: '预留菜单2',
              router: ''
            }
          ]
        }
      ],
      defaultSelectedKeys: [this.$route.path],
      openKeys: ['']
    };
  },
  methods: {
    // 当菜单被展开时触发此处
    onOpenChange(openKeys) {
      /*
      经测试传入的变量openKeys是数组 点击已经展开的菜单时传入的是空数组
      点击未展开的菜单时传入的是[当前展开菜单的key,点击的菜单key]
      下面的if判断用openKeys === [] 无效 所以我只能判断数组length是否等于0
      */
      if (openKeys.length !== 0) {
        this.openKeys = [openKeys[1]];
      } else {
        this.openKeys = [''];
      }
    },
    // 路由跳转
    clickItem(path) {
      this.$router.push(path);
    },
    // 返回首页
    goIndex(path = '/index') {
      this.$router.push(path);
    },
    // 退出
    exitSystem() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="less" scoped>
.home-container,
.home_box {
  height: 100%;
}
.header {
  background-color: #0e4375;
  display: flex;
  width: 100%;
  height: 75px;
  > div > span {
    vertical-align: middle;
    font-size: 30px;
    letter-spacing: 5px;
    font-family: '隶书';
    color: #fff;
    text-shadow: 0px 3px 7px #999;
    display: inline-block;
    padding: 13px 0;
  }
  > div > img {
    vertical-align: middle;
    padding: 8px 20px;
    border-radius: 50%;
  }
  > div > .outbtn {
    position: absolute;
    right: 20px;
    top: 10px;
    .tie {
      font-size: 26px;
      font-family: '隶书';
      color: #fbf7f9;
      display: inline-block;
      padding-right: 10px;
      vertical-align: middle;
    }
  }
}
.main {
  display: flex;
  height: auto;
  border-top: 2px solid #fff;
}
.cs_aside {
  width: 200px;
  height: auto;
  background-color: #001529;
}
.cs_content {
  flex: 1;
  padding: 10px;
  background-color: #0e4375;
}
.cs_ico {
  font-size: 18px;
  vertical-align: middle;
}
.cs_text {
  display: inline-block;
  padding-left: 7px;
}
.cs_flex {
  display: flex;
}
.logo_title {
  width: 420px;
}
.cs_info {
  flex: 1;
  li {
    float: right;
    width: 100px;
    line-height: 75px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    span {
      display: inline-block;
      padding-left: 5px;
    }
  }
}
</style>
