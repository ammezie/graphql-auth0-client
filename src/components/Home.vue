<template>
  <div>
    <div v-if="authenticated">
      <p>You are logged in!</p>

      <p>
        <router-link to="addtodo">Add new todo</router-link>
        or view your list of <router-link to="mytodos">todos</router-link>
      </p>
    </div>
    <h4 v-else>
      You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
    </h4>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: ['auth', 'authenticated']
}
</script>
