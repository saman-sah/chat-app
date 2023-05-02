<template>
    <div class="auth">
        <div v-if="currentUser && currentUser.auth" class="pages-nav">
            <div class="user-name-logged">
                {{ userInfo.name }}
            </div>
            <div class="btn-log-out">
                <button @click="logOut">Logout</button>
            </div>
        </div>
        <div v-else class="pages-nav">
            <button :style="{ 
                backgroundColor: login_register== 'login' ? '#ffa31a' : '#1b1b1b',
                border: login_register== 'login' ? '2px solid #1b1b1b' : ''
            }"
            @click="login_register= 'login'" 
            type="submit" class="btn-select-login">
                Login
            </button>                
            <button :style="{ 
                backgroundColor: login_register== 'register' ? '#ffa31a' : '#1b1b1b' ,
                border: login_register== 'register' ? '2px solid #1b1b1b' : ''
            }"
            @click="login_register= 'register'" 
            type="submit" class="btn-select-register">
                Register
            </button> 
        </div>

        <div v-if="currentUser && currentUser.auth" class="auth-content" id="auth">
            <h4>You already logged in !!!</h4>
        </div>
        <div v-else class="auth-content" id="auth">
            <input v-if="login_register== 'register'"
            type="name" v-model="userData.name"
                name="name" placeholder="Name"
                autocomplete="off">
            <input type="email" v-model="userData.email"
                name="email" placeholder="Email"
                autocomplete="off">
            <input type="password" v-model="userData.password" 
            name="password" placeholder="Password"
            autocomplete="off">
        </div>

        <div v-if="currentUser && currentUser.auth" class="form-login-register" >
            <button>go to contacts page</button>
        </div>
        <div v-else class="form-login-register" >
            <div class="btns-login-register">
                <button v-if="login_register== 'login'" 
                @click="login(userData)" class="btn-login">
                    Login
                </button>                
                <button v-else 
                @click="register(userData)" class="btn-register">
                    Register
                </button>                
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            userData:{},
            login_register: 'login'
        }
    },
    computed: {
        ...mapState([
            'currentUser',
            'userInfo'
        ])
    },
    methods: {
        ...mapActions({
            register: 'register',
            login: 'login',
            logOut: 'logOut'
        }),
    },
}
</script>

<style>

</style>