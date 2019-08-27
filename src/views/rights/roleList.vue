<template>
  <div class="roleList">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>

      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色按钮 -->
    <el-button type="success" style="margin-bottom: 10px" @click="addId">添加角色</el-button>
    <el-dialog title="添加角色" :visible.sync="addDialogFormVisible">
      <el-form :model="addById" :label-width="formLabelWidth">
        <el-form-item label="角色名称">
          <el-input v-model="addById.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addById.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 表格 -->
    <el-table :data="roleList" border style="width: 100%">
      <el-table-column type="expand">
        <!-- 添加每列的权限列表 -->
        <template slot-scope="scope">
          <el-row v-for="first in scope.row.children" :key="first.id">
            <el-col :span="4">
              <el-tag
                closable
                type="success"
                @close="delRight(scope.row,first.id)"
              >{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id">
                <el-col :span="4">
                  <el-tag
                    closable
                    type="info"
                    @close="delRight(scope.row,second.id)"
                    style="margin-bottom: 5px;margin-left: 10px"
                  >{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    v-for="third in second.children"
                    :key="third.id"
                    type="error"
                    @close="delRight(scope.row,third.id)"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-show="scope.row.children.length === 0">无数据 请添加</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <el-tooltip class="item" effect="dark" content="编辑用户" placement="top-start">
          <el-button type="primary" icon="el-icon-edit"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="分配属性" placement="top-start">
          <el-button type="primary" icon="el-icon-share" @click="clickList"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除列表" placement="top-start">
          <el-button type="primary" icon="el-icon-delete"></el-button>
        </el-tooltip>
      </el-table-column>
    </el-table>

    <!-- 权限管理按钮的树形结构 -->
    <el-dialog title="权限分配" :visible.sync="dialogFormVisible">
      <el-tree
        :data="rightList"
        show-checkbox
        node-key="id"
        :default-checked-keys="chkedArr"
        :default-expand-all="true"
        :props="defaultProps"
      ></el-tree>
    </el-dialog>
  </div>
</template>

<script>
// 引入获取所有角色数据的封装
import { getAllRoleList, delRightByRoleId } from '@/api/role_index.js'
// 引入获取所有权限列表的封装
import { getAllRightList } from '@/api/right_index.js'
export default {
  data () {
    return {
      roleList: [],
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      chkedArr: [],
      rightList: [],
      dialogFormVisible: false,
      addDialogFormVisible: false,
      addById: {
        roleName: '',
        roleDesc: ''
      },
      formLabelWidth: '120px'
      //   rules: {
      //     roleName: [
      //         required: true,
      //          message: '请输入活动名称',
      //          trigger: 'blur'
      //     ],
      //     roleDesc: [

    //     ]
    //   }
    }
  },
  methods: {
    delRight (row, rightId) {
      console.log(row, rightId)
      delRightByRoleId(row.id, rightId)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            row.children = res.data.data
            this.$message.success('成功')
          }
        })
        .catch(err => {
          console.log(err)
          this.$massage.error('失败')
        })
    },
    // 当点击分配属性时触发树形结构
    clickList () {
      getAllRightList('tree').then(res => {
        console.log(res)
        this.rightList = res.data.data
      })
      // 点击后显示树形结构
      this.dialogFormVisible = true
    },
    addId () {
      console.log(111)
      this.addDialogFormVisible = true
    },
    init () {
      getAllRoleList().then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.roleList = res.data.data
        }
      })
    }
  },
  mounted () {
    //   将数据渲染到页面上
    this.init()
  }
}
</script>

<style lang="less" scoped>
</style>
