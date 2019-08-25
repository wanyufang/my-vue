<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class="wan">
          <img src="../assets/logo.png" alt />
        </div>
        <el-menu
          :router="true"
          :unique-opened="true"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/home/user">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>权限列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2-2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>角色列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header">
            <a href="#">
              <span class="el-icon-menu"></span>
            </a>
            <h2>后台管理系统</h2>
            <span class="close">
              <a href="#">退出</a>
            </span>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.wan {
  width: 200px;
  height: 60px;
  background-color: #fff;
}
.wan img {
  width: 174%;
}
aside {
  height: 100vh;
  background-color: #545c64;
}
.header h2 {
  display: inline-block;
  font-size: 30px;
  font-weight: 600;
}
.header {
  color: #fff;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  background-color: #545c64;
  line-height: 60px;
  height: 60px;
}
.el-header {
  padding: 0px;
}
.el-icon-menu {
  font-size: 26px;
}
.close {
  font-size: 18px;
}
</style>
