import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/views/login.vue'
import home from '@/views/home.vue'
import welcome from '@/views/welcome.vue'
import user from '@/views/user/user.vue'
import rightList from '@/views/rights/rightList.vue'
import roleList from '@/views/rights/roleList.vue'
Vue.use(VueRouter)

// 创建路由对象
export default new VueRouter({
  routes: [
    {
      name: 'default',
      path: '/',
      redirect: { name: 'login' }
    },
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'home',
      path: '/home',
      component: home,
      redirect: { name: 'welcome' },
      children: [
        {
          name: 'welcome',
          path: 'welcome',
          component: welcome
        },
        {
          name: 'user',
          path: 'user',
          component: user
        },
        {
          name: 'rightList',
          path: 'rightList',
          component: rightList
        },
        {
          name: 'roleList',
          path: 'roleList',
          component: roleList
        }
      ]
    }
  ]
})
