<template>
    <div class="chatBox" v-if="Object.keys(current).length != 0">
        <div class="messages-container">
            <MessageBbl v-for="(m, idx) of current.messages" :key="idx" :msg="m" :currUser="user_id" />
            <div ref="bottom"></div>
        </div>
        <div class="form-container">
            <form class="messages-form" @submit.prevent="sendMessage">
                <input type="text" v-model="message" placeholder="Type something...">
                <input type="submit" value="Go!">
            </form>
        </div>
    </div>
    <div class="alt_chatBox" v-else></div>
</template>

<script>
import { computed, nextTick, onMounted, ref, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';

import MessageBbl from './MessageBbl.vue';

export default {
    name: 'ChatBox',
    components: {
        MessageBbl
    },
    setup() {
        const store = useStore();
        const socket = computed(() => store.state.io);
        const current = computed(() => store.state.currentRoom);
        const message = ref('');
        const bottom = ref(null);

        const user_id = localStorage.getItem('MSG_user_id');
        const username = localStorage.getItem('MSG_username');

        function getDate() {
            const date = new Date();
            const yr = date.getFullYear();
            const mo = date.getMonth() + 1;
            const day = date.getDate();

            const hours = date.getHours();
            const hr = hours < 10 ? '0' + hours : hours;

            const minutes = date.getMinutes();
            const min = (minutes < 10) ? '0' + minutes : minutes;

            const seconds = date.getSeconds();
            const sec = (seconds < 10) ? '0' + seconds : seconds;

            const newDateString = yr + '-' + mo  + '-' + day;
            const newTimeString = hr + ':' + min + ':' + sec;

            const dateString = newDateString + ' ' + newTimeString;

            return dateString;
        }

        const sendMessage = () => {
            const obj = {
                sender_id: user_id,
                room_id: current.value.Id,
                message: message.value
            }
            console.log(obj);

            socket.value.emit('new_message', obj);
            message.value = '';
        }

        watch(current, async () => {
            await nextTick();
            bottom.value.scrollIntoView({alignToTop: false});
        }, {
            deep: true
        });

        return { message, sendMessage, current, bottom, user_id };
    }
}
</script>

<style scoped>
.alt_chatBox {
    width: 50%;
    height: 100%;
}
.chatBox {
    width: 50%;
    height: 100%;

    box-shadow: 2px 2px 10px black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.messages-container {
    width: 100%;
    height: calc(100% - 70px);

    overflow: auto;
}

.form-container {
    background-color: rgb(149, 180, 149);

    width: 100%;
    height: 60px;
}

.messages-form {
    width: 80%;
    height: 100%;

    margin-left: auto;
    margin-right: auto;

    display: flex;
    justify-content: space-around;
    align-items: center;
}

.messages-form > input {
    height: 30px;

    border: 1px solid gray;
    border-radius: 7px;

    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
}
.messages-form > input[type="submit"] {
    width: 50px;
    border: rgb(22, 65, 22);
    background-color: rgb(39, 116, 39);
    font-weight: 700;
    color: white;
    transition-property: background-color, color;
    transition-duration:200ms;
}

input[type="submit"]:hover {
    border: 2px solid green;
    background-color: rgba(39, 116, 39, 0);
    color: green;
    cursor: pointer;
}

.messages-form > input[type="text"] {
    width: calc(100% - 60px);
    color: rgb(77, 77, 77);
}


</style>
