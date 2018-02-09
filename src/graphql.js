import gql from 'graphql-tag'

export const MY_TODOS_QUERY = gql`
  query MyTodosQuery {
    myTodos {
      title
    }
  }
`

export const ADD_TODO_MUTATION = gql`
  mutation AddTodoMutation($title: String!) {
    addTodo(title: $title) {
      title
    }
  }
`
