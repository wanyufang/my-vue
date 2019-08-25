import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入自定义样式
import '@/styles/index.less'
import router from '@/router/router.js'

Vue.config.productionTip = false

Vue.use(ElementUi)

// 添加导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  // 获取token
  let mytoken = localStorage.getItem('itcast_manager_35_token')
  if (mytoken || to.path === '/login') {
    // 下一步
    next()
  } else {
    // 重定向
    next({
      path: '/login'
    })
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
