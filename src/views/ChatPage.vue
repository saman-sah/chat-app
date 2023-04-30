<template>
    <div class="chat">
        <div class="pages-nav">
            <div class="back-icon" @click="$router.go(-1)">
                <i class="fa fa-arrow-left"></i>
            </div>
            <div class="name user-chat-title">
                {{ otherUserInfo.name }}
                <div :style="{'background-color': otherUserInfo.online ? '#38d938' : 'red'}"
                class="badge" ></div>
            </div>
            <div></div>
        </div>

        <div class="messages" id="chat">
            
            <div v-for="(message, index) in messages"
            :key="index" 
            :class="['message' ,message.from]">
                <sup v-if="message.from== 'sent'" 
                class="name-user-messages">
                    {{ userInfo.name }}
                </sup>
                <sup v-else 
                class="name-user-messages">
                    {{ otherUserInfo.name }}
                </sup>
                <span>
                    {{ message.text }}
                </span>
            </div>
        </div>

        <form class="form-send-msg" @submit.prevent="sendMesssage()">
            <div class="input">
                <input v-model="newMessage"
                placeholder="Type your message here!" type="text">
                <button type="submit" class="btn-send-msg">
                    <i class="fas fa-paper-plane"></i>
                </button>
                
            </div>
        </form>
        
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    data() {
        return {
            newMessage: '',
        }
    },
    mounted() {
        this.getMessages(this.$route.params.otherUserId)
    },
    unmounted() {
        this.stopGettingMessages();
    },
    computed: {
        ...mapState([
            'messages',
            'userInfo'
        ]),
        otherUserInfo() {
            if(this.$store.state.users[this.$route.params.otherUserId]) {
                return this.$store.state.users[this.$route.params.otherUserId]
            }
            return {} 
        }
    },
    methods: {
        ...mapActions({
            getMessages: 'getMessages',
            stopGettingMessages: 'stopGettingMessages',
            actionSendMessage: 'actionSendMessage'
        }),
        sendMesssage() {
            this.actionSendMessage({
                message: {
                    text: this.newMessage,
                    from: 'sent'
                },
                otherUserId: this.$route.params.otherUserId    
            })
            this.newMessage= '';
        }
    },
}
</script>

<style>
.message,
.user-chat-title {
    position: relative;
}
.name-user-messages {
    position: absolute;
    top: -1em;
    color: #333;
}
.sent .name-user-messages {
    right: 0;
}
.recieved .name-user-messages {
    left: 0;
}
</style>