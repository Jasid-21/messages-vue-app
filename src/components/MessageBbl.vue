<template>
    <div class="message-bbl" :class="{owner: msg.user.Id == currUser}">
        <div class="details">
            <span class="sender">{{ msg.user.username }}</span>
            <div class="date">
                <span class="day">{{ msg.send_date.split(/[ T]/)[0] + ' ' }}</span>
                <span class="hour">{{ msg.send_date.split(/[ T.]/)[1] }}</span>
            </div>
        </div>
        <div class="message">{{ msg.message }}</div>
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
    name: 'MessageBbl',
    props: ['msg', 'currUser'],
    setup(props) {
        const msg = computed(() => props.msg);
        const dateObj = new Date(msg.value.send_date);
        const day = dateObj.getDay();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        const date = day + '-' + month + '-' + year;

        return {date}
    }
}
</script>

<style scoped>
.message-bbl {
    min-width: 50px;
    max-width: 60%;

    background-color: rgb(214, 214, 214);
    border: 2px solid rgb(109, 109, 109);
    border-radius: 10px;

    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 5px;
}

.message-bbl.owner {
    margin-left: auto;
    margin-right: 5px;

    background-color: rgb(153, 202, 153);
    border: 2px solid rgb(89, 126, 89);
}

.details {
    width: 90%;
    padding: 0px 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.details > .sender {
    font-weight: 600;
}

.details > .date {
    color: rgb(54, 54, 54);
    font-style: italic;
    font-size: 14px;
    font-weight: 600;
}

.date > .hour {
    color: rgb(21, 21, 133);
}

.message {
    padding: 10px;

    color: rgb(24, 24, 24);
    word-wrap: break-word;
}
</style>
