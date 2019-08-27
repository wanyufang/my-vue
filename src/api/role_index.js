// 引入axios
import axios from '@/utils/myaxios.js'

// 获取所有角色数据
export const getAllRoleList = () => {
  return axios({
    url: 'roles'
  })
}

// 获取所有角色id的数据
export const delRightByRoleId = (roleId, rightId) => {
  return axios({
    method: 'delete',
    url: `roles/${roleId}/rights/${rightId}`
  })
}
