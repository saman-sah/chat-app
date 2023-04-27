<template>
  <router-view/>
</template>
<script>
  export default {
    computed: {
      titlePage() {
        let path= this.$route.path 
        if(path == "/user-page") return 'Users'
        if(path == "/chat-page") return 'Chat'
        if(path == "/auth-page") return 'Login / Register'
      }
    }
  }
</script>