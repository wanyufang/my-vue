<template>
  <div class="rightList">
    <template>
      <el-table :data="rightList" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="层级" prop="level">
            <template slot-scope="scope">
                <span>{{scope.row.level | levelFormat}}</span>
            </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { getAllRightList } from '@/api/right_index.js'
export default {
  data () {
    return {
      rightList: []
    }
  },
  mounted () {
    getAllRightList('list')
      .then((res) => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.rightList = res.data.data
        } else {
          this.$message.error('获取数据失败')
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  filters: {
    levelFormat (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
