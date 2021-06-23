<!--
 * @Description: 登录模块
 * @Author: zhangweigang
 * @Date: 2021-05-23 21:12:10
 * @LastEditTime: 2021-06-16 11:16:27
 * @LastEditors: zhangweigang
-->
<template>
  <div class="cs_bg">
    <!-- 登录部分 -->
    <div class="cs_login">
      <a-form-model ref="loginFormRef" :model="loginForm" :rules="loginRules" :label-col="labelCol" :wrapper-col="wrapperCol" class="form">
        <a-form-model-item label="" prop="name">
          <a-input type="text" v-model="loginForm.name" placeholder="用户名">
            <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item label="" prop="password">
          <a-input-password v-model="loginForm.password" placeholder="密码">
            <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
          </a-input-password>
        </a-form-model-item>
        <div class="cs_between">
          <a-form-model-item label="" prop="verificCode">
            <a-input type="text" v-model="loginForm.verificCode" placeholder="验证码"> </a-input>
          </a-form-model-item>
          <div @click="changeCode()" class="cs_course">
            <!-- 引入验证码组件 -->
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
        </div>
        <a-button class="cs_login_btn" type="primary" @click="onSubmitLogin" block>登录</a-button>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { SIdentify } from '../../components';
export default {
  components: { SIdentify },
  data() {
    let validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (this.loginForm.name !== '') {
          this.$refs.loginFormRef.validateField('user');
        }
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.loginForm.name !== '') {
          this.$refs.loginFormRef.validateField('pass');
        }
        callback();
      }
    };
    let validateCodes = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else {
        if (this.loginForm.name !== '') {
          this.$refs.loginFormRef.validateField('pass');
        }
        callback();
      }
    };
    return {
      labelCol: { span: 10 },
      wrapperCol: { span: 19 },
      // 验证码初始值
      identifyCode: '1234',
      // 验证码的随机取值范围
      identifyCodes: '1234567890',
      loginForm: {
        name: 'admin',
        password: '123456',
        verificCode: '123456'
      },
      loginRules: {
        name: [{ validator: validateUser, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        verificCode: [{ validator: validateCodes, trigger: 'blur' }]
      }
    };
  },
  methods: {
    // 登录提交
    onSubmitLogin() {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          this.$router.push('/index');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 点击验证码刷新验证码
    changeCode() {
      this.identifyCode = '';
      this.makeCode(this.identifyCodes, 4);
    },
    // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
    randomNum(min, max) {
      max = max + 1;
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 随机生成验证码字符串
    makeCode(data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)];
      }
    }
  }
};
</script>

<style scoped>
.cs_bg {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('../../assets/image/bg_3.png') no-repeat;
  background-size: cover;
}
.cs_login {
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -60%);
  width: 400px;
  height: 400px;
  border-radius: 5px;
  background-color: #000000; /* IE6和部分IE7内核的浏览器(如QQ浏览器)下颜色被覆盖 */
  background-color: rgba(0, 0, 0, 0.2); /* IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂，但解析为透明 */
  box-shadow: 0px 0px 20px #fff;
}

.color_text {
  color: white;
}
.form {
  padding: 80px 0 0 80px;
}
.cs_between {
  width: 250px;
  display: flex;
  justify-content: space-between;
}
.cs_course {
  cursor: pointer;
}
.cs_login_btn {
  width: 255px;
}
</style>
