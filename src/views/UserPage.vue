<template>
    <div class="contacts">
        <div class="pages-nav">
            <div class="name">
                Contacts
            </div>
            <div class="btn-log-out">
                <button @click="logOut">Logout</button>
            </div>
        </div>
       
        <div class="contacts-item">
            <div v-for="(user, key) in users" :key="key" class="contact">
                <div class="pic danvers">
                    <h1>{{user.name.charAt(0)}}</h1>
                </div>
                <div class="badge" :style="{'background-color': user.online ? '#38d938' : 'red'}"></div>
                <div class="name user-name-link">
                    <router-link to="/chat-page">
                        <h4>{{ user.name }}</h4>
                    </router-link>
                </div>
                <div class="badge-status" :style="{'background-color': user.online ? '#38d938' : 'red'}">
                    <span>{{ user.online ? 'Online' : 'Offline'}}</span>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'users'
        ])
    },

    methods: {
        ...mapActions({
            logOut: 'logOut'
        })
    },
}
</script>

<style>
.contacts-item {
    padding: 1em;
}

</style>