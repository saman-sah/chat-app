<template>
    <div class="contacts contacts-page">
        <div class="pages-nav">
            <div class="name contacts-title">
                Contacts
            </div>
            <div v-if="currentUser && currentUser.auth" class="btn-log-out">
                <button @click="logOut">Logout</button>
            </div>
        </div>
       
        <div class="contacts-item">
            <div v-for="(user, key) in users" :key="key" class="contact">
                <div v-if="user.image" class="pic danvers" :style="{'background-image': user.image ? 'url('+user.image+')' : ''}">
                    <div class="badge" :style="{'background-color': user.online ? '#ffa31a' : '#1b1b1b'}"></div>
                </div>
                <div v-else class="pic danvers">
                    <h4>{{user.name.charAt(0)}}</h4>
                    <div class="badge" :style="{'background-color': user.online ? '#ffa31a' : '#1b1b1b'}"></div>
                </div>
                
                <div class="name user-name-link">
                    <router-link :to="'/chat-page/'+ key">
                        <h4>{{ user.name }}</h4>
                    </router-link>
                </div>
                <div class="badge-status" :style="{'color': user.online ? '#ffa31a' : '#dadada'}">
                    <span>{{ user.online ? 'Online' : 'Offline'}}</span>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    computed: {
        ...mapState([
            'currentUser',
        ]),
        ...mapGetters([
            'users',            
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


</style>