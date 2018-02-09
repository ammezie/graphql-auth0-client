<template>
  <div>Loading...</div>
</template>

<script>
export default {
  name: 'Callback',
  props: ['auth'],
  created () {
    this.auth.handleAuthentication()
  }
}
</script>
