import axios from 'axios'

// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 拦截器的本质并不是来发起请求的 而是对请求报文进行处理
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么: 获取token 设置请求头
  //  1 获取token
  let mytoken = localStorage.getItem('itcast_manager_35_token')
  if (mytoken) {
    // 2 设置请求头: config.headers是一个对象 里面就包含着当前的请求头的设置
    // console.log(config)
    config.headers.Authorization = mytoken
  }
  return config
},
function (error) {
  return Promise.reject(error)
})

export default axios
