<template>
  <div class="masterContainer">
    <Navbar />
    <div class="home">
      <Rooms :rooms="rooms" />
      <ChatBox />
      <ConnectedUsers :clients="clients" />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Rooms from '@/components/Rooms.vue';
import ConnectedUsers from '@/components/ConnectedUsers.vue';
import ChatBox from '@/components/ChatBox.vue';
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';

import { io } from 'socket.io-client';

export default {
  name: 'Home',
  components: {
    Navbar,
    Rooms,
    ConnectedUsers,
    ChatBox
  },

  setup() {
    const store = useStore();
    const rooms = computed(() => store.state.rooms);
    const clients = computed(() => store.state.clients);

    const user_id = localStorage.getItem('MSG_user_id');
    const user = localStorage.getItem('MSG_username');
    const token = localStorage.getItem('MSG_token');

    const socket = io({
      query: {
        user,
        user_id
      }
    });

    socket.on('updated', () => {
      store.commit('set_socket', socket);

      const url = `/home_info?id=${user_id}&token=${token}`;
      fetch(url)
      .then(resp => resp.json())
      .then(data => {
        store.commit('set_rooms', data.rooms);
        store.commit('set_clients', data.clients);
      });
    });

    socket.on('new_client', (data) => {
      console.log("New client...");
      store.commit('add_client', data);
    });

    socket.on('new_message', (obj) => {
      console.log("Here");
      store.commit('add_message', obj);
    });

    socket.on('new_room', (roomObj) => {
      console.log(roomObj);
      store.commit('add_room', roomObj);
    });

    return {rooms, clients}
  }
}
</script>

<style scoped>
.masterContainer {
  width: 100vw;
  height: 100vh;

  margin: 0px;
  padding: 0px;
}
.home {
  width: 100%;
  height: calc(100% - 80px);

  display: flex;
  justify-content: space-between;
}
</style>
