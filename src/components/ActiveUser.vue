<template>
    <li class="user_container" @dblclick="new_room">
        <span class="me" v-if="client.Id == user_id">{{ 'Me: ' }}</span>
        <span>{{ client.username }}</span>
    </li>
</template>

<script>
export default {
    name: 'ActiveUser',
    props: ['client'],
    emits: ['newRoom'],
    setup(props, { emit }) {
        const user_id = localStorage.getItem('MSG_user_id');

        const new_room = () => {
            emit('newRoom', props.client.Id);
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
