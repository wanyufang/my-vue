import axios from '@/utils/myaxios.js'

// 获取所有权限列表数据
export const getAllRightList = (type) => {
  return axios({
    url: `rights/${type}`
  })
}
