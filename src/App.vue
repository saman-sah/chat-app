<template>
  <router-view/>
</template>
<script>
import { mapActions, mapState } from 'vuex';
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