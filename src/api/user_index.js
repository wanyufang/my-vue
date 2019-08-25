
// 引用封装好的axios
import axios from '@/utils/myaxios.js'

// 获取所有用户的数据
export const getAllUsers = (params) => {
  return axios({
    url: 'users',
    params
  })
}

// 实现用户数据的新增
export const addUser = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}

// 实现用户数据的编辑
export const editUser = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}

// 实现用户角色的分配
export const allotUser = (data) => {
  return axios({
    url: `users/${data.id}/role`,
    method: 'put',
    data: { rid: data.rid }
  })
}

// 实现用户数据的删除
export const delUserById = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}

// 实现用户状态设置
export const updateUser = (uid, type) => {
  return axios({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}
