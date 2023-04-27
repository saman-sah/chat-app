<template>
  <div class="auth">
        <div class="pages-nav">
            <button :style="{ backgroundColor: login_register== 'login' ? '#aaa' : '' }"
            @click="login_register= 'login'" 
            type="submit" class="btn-select-login">
                Login
            </button>                
            <button :style="{ backgroundColor: login_register== 'register' ? '#aaa' : '' }"
            @click="login_register= 'register'" 
            type="submit" class="btn-select-register">
                Register
            </button> 
        </div>

        <div class="auth-content" id="auth">
            <form>
                <input v-if="login_register== 'register'"
                type="name" v-model="user.name"
                 name="name" placeholder="Name"
                 autocomplete="off">
                <input type="email" v-model="user.email"
                 name="email" placeholder="Email"
                 autocomplete="off">
                <input type="password" v-model="user.password" 
                name="password" placeholder="Password"
                autocomplete="off">
            </form>
        </div>

        <form class="form-login-register" >
            <div class="btns-login-register">
                <button v-if="login_register== 'login'" 
                @click="loginRegister()"
                type="submit" class="btn-login">
                    Login
                </button>                
                <button v-else 
                @click="loginRegister()"
                type="submit" class="btn-register">
                    Register
                </button>                
            </div>
        </form>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            user:{},
            login_register: 'login'
        }
    },
    methods: {
        loginRegister() {
            if(this.login_register== 'login'){
                console.log('login');
            }else {
                console.log('register');
            }
        }
    },
}
</script>

<style>

</style>