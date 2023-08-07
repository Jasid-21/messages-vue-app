<template>
    <div class="rooms">
        <ul>
            <li v-for="(r, idx) of rooms" 
            :key="idx" 
            @click="setCurrent(r.Id)"
            :class="{current:current.Id == r.Id}"
            >
                {{ r.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
    name: 'Rooms',
    setup() {
        const store = useStore();
        const rooms = computed(() => store.state.rooms);
        const current = computed(() => store.state.currentRoom);

        const setCurrent = (id) => {
            store.commit('set_current_room', id);
        }

        return { setCurrent, current, rooms };
    }
}
</script>

<style scoped>
.rooms {
    width: 300px;
    height: 100%;

    border-right: 2px solid gray;
}

.rooms > ul {
    margin: 0px;
    max-height: calc(100% - 20px);
    list-style: none;
    margin: 0px;
    padding: 0px;
    padding-bottom: 10px;

    overflow-y: auto;
    overflow-x: hidden;
}

.rooms > ul::-webkit-scrollbar, ul::-webkit-scrollbar-track {
    width: 5px;
    background-color: transparent;
}

.rooms > ul::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: rgb(0, 75, 37);
    border-radius: 5px;
}

ul > li {
    width: calc(100% - 40px);
    box-shadow: 2px 2px 5px black;
    border-radius: 7px;
    font-style: oblique;
    font-weight: 600;

    background-color: #90C8AC;

    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;

    padding: 4px 10px;
}

li:hover {
    font-weight: 800;
    cursor: pointer;
    background-color: #73A9AD;
}

li.current {
    font-weight: bolder;
    background-color: #47888b;
}
</style>
