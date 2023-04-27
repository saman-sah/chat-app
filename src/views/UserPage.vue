<template>
    <div class="contacts">
        <div class="pages-nav">
            <div class="name">
                Contacts
            </div>
        </div>
        <div class="contacts-item">
            <div v-for="(user, index) in users" :key="index" class="contact">
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
export default {
    data() {
        return {
            users:[
                {
                    id: 1,
                    name: "saman",
                    online: false
                },
                {
                    id: 2,
                    name: "sadra",
                    online: true
                },
                {
                    id: 3,
                    name: "sahar",
                    online: false
                },
            ]
        }
    },
}
</script>

<style>
.contacts-item {
    padding: 1em;
}

</style>