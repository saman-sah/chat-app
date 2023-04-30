<template>
  <router-view/>
</template>
<script>
import { mapActions } from 'vuex';
  export default {
    mounted() {
      this.fetchUser();
    },
    methods: {
        ...mapActions({
            fetchUser: 'handleAuthStateChange',
        })
    },
  }
</script>