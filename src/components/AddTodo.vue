<template>
  <div class="section">
    <div class="columns">
      <div class="column is-6">
        <h2 class="title">Add Todo</h2>

        <form method="post" @submit.prevent="addTodo">
          <div class="field">
            <label class="label">Title</label>

            <div class="control">
              <input
                type="text"
                class="input"
                v-model="title">
            </div>
          </div>

          <div class="control">
            <button class="button is-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ADD_TODO_MUTATION, MY_TODOS_QUERY } from '@/graphql'

export default {
  name: 'AddTodo',
  props: ['authenticated'],
  data () {
    return {
      title: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      return vm.authenticated ? next() : next('/')
    })
  },
  methods: {
    addTodo () {
      this.$apollo
        .mutate({
          mutation: ADD_TODO_MUTATION,
          variables: {
            title: this.title
          },
          update: (store, { data: { addTodo } }) => {
            // read data from cache for this query
            const data = store.readQuery({ query: MY_TODOS_QUERY })
            // add new todo from the mutation to existing todos
            data.myTodos.push(addTodo)
            // write data back to the cache
            store.writeQuery({ query: MY_TODOS_QUERY, data })
          }
        })
        .then(response => {
          console.log(response)
          this.$router.replace('/mytodos')
        })
    }
  }
}
</script>
