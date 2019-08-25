/* eslint-disable vue/no-unused-vars */
<template>
  <div class="user">
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索区域 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="userobj.query"
        class="input-with-select"
        style="width: 300px"
        @keydown.enter.native="init"
      >
        <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
      </el-input>
      <el-button type="success" @click="addDialogFormVisible = true" style="margin-left: 15px">添加用户</el-button>
    </div>

    <!-- 表格展示区域 -->
    <el-table broder :data="userList" style="width: 100% margin-top: 15px">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change='changeState(scope.row.id,scope.row.my_state)'></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="clickEdit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="分配角色"
            placement="top"
          >
            <el-button size="success" icon="el-icon-share" @click="showGrantDialog(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button size="warning" icon="el-icon-delete" @click="clickDel(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userobj.pagenum"
      :page-sizes="[1, 2, 3, 4 ,5 ]"
      :page-size="userobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 用户新增区域 -->
    <el-dialog title="添加新用户" :visible.sync="addDialogFormVisible">
      <el-form
        :model="addForm"
        style="width: 300px"
        :label-width="'100px'"
        :rules="rules"
        ref="addForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 实现用户数据的编辑 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="用户名" :label-width="'80px'">
          <el-input v-model="editForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="'80px'" prop="email">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="'80px'" prop="mobile">
          <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 实现分配角色的对话框 -->
    <el-dialog title="角色分配" :visible.sync="allotDialogFormVisible">
      <el-form :model="allotForm" :label-width="'80px'">
        <el-form-item label="用户名:">
          <el-input v-model="allotForm.username" auto-complete="off" disabled style="width: 120px"></el-input>
        </el-form-item>
        <el-form-item label="角色:">
          <el-select v-model="allotForm.rid" clearable placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="allotDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotForUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllUsers, addUser, editUser, allotUser, delUserById, updateUser } from '@/api/user_index.js'
import { getAllRoleList } from '@/api/role_index.js'
export default {
  data () {
    return {
      roleList: [],
      total: 0,
      status: true,
      userList: [],
      // 分页区域
      userobj: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      // 用户新增区域
      addDialogFormVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 用户编辑区域
      editDialogFormVisible: false,
      editForm: {
        id: '',
        email: '',
        mobile: ''
      },
      // 分配角色区域
      allotDialogFormVisible: false,
      allotForm: {
        username: '',
        // 用户id
        id: '',
        // 角色id
        rid: ''
      },
      // 用户新增区域
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
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          // 添加正则表达式
          {
            pattern: /\w+[@]\w+[.]\w/,
            message: '请输入合法的电子邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 用户新增区域方法
    add () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          addUser(this.addForm)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 201) {
                this.$message.success('添加用户成功')
                this.init()
                this.addDialogFormVisible = false
                // 清空表单元素的数据 -- 重置表单元素
                this.$refs.addForm.resetFields()
              }
            })
            .catch(err => {
              console.log(err)
              this.$message.success('用户新增失败')
            })
        } else {
          this.$message.warning('请输入所有必填数据')
        }
      })
    },
    // 点击编辑后将框弹出并传数据
    clickEdit (row) {
      // console.log(111)
      this.editDialogFormVisible = true
      this.editForm.username = row.username
      this.editForm.id = row.id
      this.editForm.mobile = row.mobile
      this.editForm.email = row.email
    },
    // 点击分配角色后打开对话框
    showGrantDialog (row) {
      // console.log(row)
      this.allotDialogFormVisible = true
      this.allotForm.username = row.username
      this.allotForm.id = row.id
      // 修改后台代码 增加rid数据的返回
      this.allotForm.rid = row.rid
    },
    // 为用户分配角色
    allotForUser () {
      // console.log(111)
      // 先判断用户是否选择的角色
      if (this.allotForm.rid) {
        console.log(this.allotForm)
        allotUser(this.allotForm)
          .then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              this.$message.success(res.data.meta.msg)
              this.allotDialogFormVisible = false
              // 清空表单元素的数据 - 重置表单元素
              this.$refs.allotForm.resetFields()
              // 重新加载数据
              this.init()
            }
          })
          .catch(() => {
            this.$message.error('用户编辑失败')
          })
      } else {
        this.$message.error('请选择角色')
      }
    },
    // 根据id删除用户数据
    clickDel (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUserById(id)
          .then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              // 再次请求数据
              this.init()
            } else {
              this.$message({
                type: 'error',
                message: res.data.meta.msg
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改用户状态
    changeState (id, type) {
      updateUser(id, type)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '修改状态成功'
            })
            this.init()
          } else {
            this.$message({
              type: 'error',
              message: res.data.meta.msg
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '修改状态失败'
          })
        })
    },
    // 用户编辑结束后点击提交时将数据发送的方法
    edit () {
      editUser(this.editForm)
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            // console.log(this.$message)
            this.$message.success('用户编辑成功')
            // 重新发送请求获取用户信息
            this.init()
            this.editDialogFormVisible = false
            // 清空表单元素的数据 - 重置表单元素
            this.$refs.editForm.resetFields()
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.success('用户编辑失败')
        })
    },
    // 分页 当切换当前页码时触发 共几页
    handleSizeChange (val) {
      this.userobj.pagesize = val
      // 重新请求数据
      this.init()
    },
    // 分页 当切换当前页码时触发 每页数量
    handleCurrentChange (val) {
      //  修改参数
      this.userobj.pagenum = val
      // 重新请求数据
      this.init()
    },
    // 封装获取用户数据方法
    init () {
      getAllUsers(this.userobj)
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.userList = res.data.data.users
            // 获取记录总数
            this.total = res.data.data.total
          } else if (res.data.meta.status === 400) {
            this.$message.error(res.data.meta.msg)
            this.$router.push({ name: 'login ' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    // 调用获取用户数据方法
    this.init()
    // 加载所有角色列表数据
    getAllRoleList()
      .then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.roleList = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="less" scoped>
</style>
