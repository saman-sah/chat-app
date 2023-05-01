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

        <div class="messages" id="chat" ref="chat_wrap">
            <div :style="{'opacity': showMsgs ? 1 : 0}">
                <div v-for="(message, key) in messages"
                :key="key" 
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
            showMsgs: false
        }
    },
    mounted() {
        this.getMessages(this.$route.params.otherUserId)
    },
    unmounted() {
        this.stopGettingMessages();
    },
    watch: {
        messages: {
            handler(newMsg) {
                if(Object.keys(newMsg).length) {
                    this.scrollToBottom();
                    setTimeout(() => {
                        this.showMsgs= true
                    }, 200);
                }
            },
            immediate: true,
            deep: true
        }
            
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
        },
        scrollToBottom(){
            let chatWrap= this.$refs.chat_wrap
            setTimeout(() => {
                chatWrap.scrollTop = chatWrap.scrollHeight                
            }, 20);
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
    top: -10px;
    color: #333;
}
.sent .name-user-messages {
    right: 0;
}
.recieved .name-user-messages {
    left: 0;
}
</style>