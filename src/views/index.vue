<!--
 * @Description:系统主页
 * @Author: zhangweigang
 * @Date: 2021-05-23 21:22:11
 * @LastEditTime: 2021-06-15 15:47:39
 * @LastEditors: zhangweigang
-->
<template>
  <div class="home_box">
    <div class="home-container">
      <div class="header" @click="goIndex">
        <div>
          <img src="../assets/image/logo2.jpg" width="100" alt="" />
          <span>电商后台管理系统</span>
        </div>
      </div>
      <div class="main">
        <div class="cs_aside">
          <!-- 侧边栏   -->
          <a-menu theme="light" :openKeys="openKeys" mode="inline" @openChange="onOpenChange" :defaultSelectedKeys="defaultSelectedKeys" style="width: 100%">
            <!-- 渲染菜单列表 -->
            <template v-for="item in menuList">
              <!-- 顶级菜单 -->
              <a-menu-item v-if="item.children === false" :key="item.router">
                <a-icon :type="item.ico" />
                <span>{{ item.name }}</span>
              </a-menu-item>
              <!-- 可以展开的二级菜单 -->
              <a-sub-menu v-else :key="item.router">
                <span slot="title">
                  <a-icon :type="item.ico" />
                  <span>{{ item.name }}</span>
                </span>
                <a-menu-item v-for="menuChildren in item.children" :key="menuChildren.router" @click="clickItem(menuChildren.router)">
                  <a-icon :type="menuChildren.ico" />
                  {{ menuChildren.name }}
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
          ico: 'home',
          children: false
        },
        {
          name: '商品',
          ico: 'layout',
          children: [
            {
              name: '商品分类',
              ico: 'profile',
              router: '/productCategorg'
            },
            {
              name: '商品类型',
              ico: 'project',
              router: '/productType'
            }
          ]
        },
        {
          name: '个人设置',
          router: '/user',
          children: [
            {
              name: '我的资料',
              router: '/home/userEdit'
            },
            {
              name: '登录记录',
              router: '/home/userLoginRecord'
            }
          ]
        }
      ],
      defaultSelectedKeys: [this.$route.path],
      openKeys: ['']
    };
  },
  created() {
    this.menuData(this.menuList);
  },
  methods: {
    menuData(result) {
      for (let i = 0; i < this.menuList.length; i++) {
        // 循环【顶级菜单数组列表】 循环的数组下标用i表示
        if (result[i].children !== false) {
          // 如果这个菜单没有【子菜单】 就不继续了（没有子菜单就是【点击可跳转页面但不会展开】的顶级菜单）
          for (let y = 0; y < result[i].children.length; y++) {
            // 循环【顶级菜单】的子菜单数组（二级菜单）数组下标用y表示
            if (result[i].children[y].router === this.$route.path) {
              // 如果子菜单的router数据和当前路由地址一样 则断定现在的页面就停留在这个数组对应的菜单中
              this.openKeys = [result[i].router];
              // 那么就把【顶级菜单（循环数组下标为i）的router属性】赋值给this.openKeys【data中当前展开的菜单】
            }
          }
        }
      }
    },
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
    goIndex() {}
  }
};
</script>

<style lang="less" scoped>
.home-container,
.home_box {
  height: 100%;
}
.header {
  background-color: #ecf0f3;
  display: flex;
  width: 100%;
  cursor: pointer;
  > div > span {
    vertical-align: middle;
    font-size: 30px;
    letter-spacing: 5px;
    font-family: '隶书';
    color: #333;
    text-shadow: 0px 3px 7px #999;
    display: inline-block;
    padding: 13px 0;
  }
  > div > img {
    vertical-align: middle;
    padding: 15px;
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
  height: 757px;
  background-color: #ffffff;
}
.cs_content {
  flex: 1;
  background-color: #ecf0f3;
}
</style>
