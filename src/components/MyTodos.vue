<template>
  <div class="section">
    <h2 class="title">My Todos</h2>

    <ul>
      <p v-if="myTodos.length === 0">No todos!</p>
      <li
        v-else
        v-for="(todo, key) in myTodos"
        :key="key">
        {{ todo.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { MY_TODOS_QUERY } from '@/graphql'

export default {
  name: 'MyTodos',
  props: ['authenticated'],
  data () {
    return {
      myTodos: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      return vm.authenticated ? next() : next('/')
    })
  },
  apollo: {
    myTodos: {
      query: MY_TODOS_QUERY
    }
  }
}
</script>
