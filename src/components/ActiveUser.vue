<template>
    <li class="user_container" @dblclick="new_room(client.user_id, client.username)">
        <span class="me" v-if="client.user_id == user_id">{{ 'Me: ' }}</span>
        <span>{{ client.username }}</span>
    </li>
</template>

<script>
import { useStore } from 'vuex';

export default {
    name: 'ActiveUser',
    props: ['client'],
    setup() {
        const store = useStore();
        const user_id = localStorage.getItem('MSG_user_id');
        const user = localStorage.getItem('MSG_username');
        const token = localStorage.getItem('MSG_token');

        const new_room = (client_id, chat_name) => {
            const url = `/new_room?token=${token}` +
            `&user_id=${user_id}&alias_2=${user}&chat_id=${client_id}&alias=${chat_name}&focused=0`;

            fetch(url, {method: 'POST'})
            .then(async (resp) => {
                const json = await resp.json();
                return {status: resp.status, resp:json}
            })
            .then(data => {
                console.log(data);
                if (data.status == 200) {
                    store.commit('add_room', data.resp);
                } else {
                    alert(data.resp.msg);
                }
            });
        }

        return {new_room, user_id};
    }
}
</script>

<style scoped>
li {
    width: calc(100% - 40px);

    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;

    border-radius: 2px;
    padding: 10px 20px;

    box-shadow: 2px 2px 5px rgb(41, 0, 41);

    background-color: rgb(70, 91, 207);
    color: white;
    font-weight: 600;
    font-style: oblique;
}

.me {
    color: black;
    font-style: normal;
}

li:hover {
    cursor: pointer;
    background-color: rgb(35, 48, 121);
}
</style>
