import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Callback from '@/components/Callback'
import MyTodos from '@/components/MyTodos'
import AddTodo from '@/components/AddTodo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/callback',
      component: Callback
    },
    {
      path: '/mytodos',
      component: MyTodos
    },
    {
      path: '/addtodo',
      component: AddTodo
    }
  ]
})
