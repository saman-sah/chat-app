<template>
    <div class="chat">
        <div class="pages-nav">
            <div class="back-icon" @click="$router.go(-1)">
                <i class="fa fa-arrow-left"></i>
            </div>
            <div class="name">
            </div>
            <div></div>
        </div>

        <div class="messages" id="chat">
            <div v-for="(message, index) in messages"
            :key="index" 
            :class="['message' ,message.from]">
                {{ message.text }}
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
            'messages'
        ])
    },
    methods: {
        ...mapActions({
            getMessages: 'getMessages',
            stopGettingMessages: 'stopGettingMessages'
        }),
        sendMesssage() {
            this.messages.push({
                text: this.newMessage,
                from: 'sent'
            })
            this.newMessage= '';
        }
    },
}
</script>

<style>

</style>