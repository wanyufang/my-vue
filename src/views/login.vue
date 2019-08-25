<template>
  <div class="login">
    <div class="container">
      <img src="../assets/avatar.jpg" alt class="avatar" />
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="myicon myicon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="myicon myicon-key"></el-input>
        </el-form-item>
        <el-button type="primary" @click="login" class="login-btn">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login_index.js'
export default {
  data () {
    return {
      name: 'login',
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      // 实现二次验证
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log('可以发送请求')
          login(this.loginForm)
            .then((res) => {
              if (res.data.meta.status === 200) {
                console.log(res)
                localStorage.setItem('itcast_manager_35_token', res.data.data.token)
                this.$router.push({ name: 'home' })
              } else {
                this.$message({
                  message: res.data.meta.msg,
                  type: 'warning'
                })
              }
            })
            .catch(() => {
              this.$message({
                message: '服务器异常 请稍后重试',
                type: 'error'
              })
            })
        } else {
          this.$message({
            // 提示信息
            message: '请输入所有必填数据',
            // 提示类型: success,info,error,warning
            type: 'warning'
          })
          console.log('数据输入有误')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
