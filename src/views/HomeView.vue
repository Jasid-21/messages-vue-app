<template>
  <div class="masterContainer">
    <Navbar />
    <div class="home">
      <Rooms />
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
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';

import { io } from 'socket.io-client';
import Swal from 'sweetalert2';

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
    const base_url = store.state.base_url;
    const base_ws_url = store.state.base_ws_url;
    const rooms = computed(() => store.state.rooms);
    const clients = computed(() => store.state.clients);
    const token = localStorage.getItem('MSG_jwt_token');

    onMounted(async () => {
      const socket = io({
        extraHeaders: { 'authorization': token },
      });
      socket.on('connect', () => {
        console.log(socket.id);
        socket.emit('get_rooms', (data) => {
          console.log(data);
          if (data.error) {
            Swal.fire({
              title: 'Error message',
              text: data.message,
              icon: 'error',
            });
            return;
          }

          store.commit('set_rooms', data);
          store.commit('set_socket', socket);
        });
      });

      socket.on('set_online_clients', (data) => {
        console.log(data);
        if (!data) return;
        store.commit('set_clients', data);
      });

      socket.on('new_message', (msg) => {
        console.log(msg);
        if (!msg) return;
        store.dispatch('add_message', msg);
      });
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
