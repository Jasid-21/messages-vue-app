<template>
  <div class="new_room_modal-container" v-if="active_container" @click="hideModal">
    <div class="new_room_modal" :class="{ active: active_modal }" @click.stop>
      <label class="room_name-label" for="room_name"> Type a name for the new room: </label>
      <input class="room_name-input" type="text" name="room_name"
      placeholder="Eg. Testing room" v-model="new_room_name">
      <br>
      <div class="buttons-container">
        <button class="confirm" @click="createNewRoom">Confirm</button>
        <button class="cancel" @click="hideModal">Cancel</button>
      </div>
    </div>
  </div>
  <div class="users">
    <ul>
      <ActiveUser v-for="(c, idx) of clients" :key="idx"
      :client="c" @newRoom="(id) => openModal(id)" />
    </ul>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import ActiveUser from './ActiveUser.vue';
import Swal from 'sweetalert2';

export default {
  name: 'ConnectedUsers',
  components: {
    ActiveUser
  },
  setup() {
    const store = useStore();
    const socket = computed(() => store.state.io);
    const clients = computed(() => store.state.clients);
    const user_id = localStorage.getItem('MSG_user_id');

    const active_container = ref(false);
    const active_modal = ref(false);
    const new_room_name = ref('');
    var new_room_client = -1;

    const openModal = (id) => {
      new_room_client = id;
      console.log(id);
      active_container.value = true;
      setTimeout(() => {
        active_modal.value = true;
      }, 50);
    }

    const hideModal = () => {
      new_room_name.value = '';
      active_modal.value = false;
      setTimeout(() => {
        active_container.value = false;
      }, 180);
    }

    const createNewRoom = () => {
      if (!new_room_name.value.trim()) {
        Swal.fire({
          title: 'App message',
          text: 'You need to provide a name',
          icon: 'error',
        });

        return;
      }

      const data = {
        name: new_room_name.value,
        user_ids: [new_room_client, user_id]
      };

      socket.value.emit('new_room', data, (resp) => {
        if (!resp) {
          Swal.fire({
            title: 'App message',
            text: 'Error creating room. Please, try latter...',
            icon: 'error',
          });
          return;
        }

        hideModal();
        store.commit('add_room', resp);
      });
    }

    return {
      clients, new_room_name,
      active_container, active_modal,
      openModal, hideModal, createNewRoom,
    };
  }
}
</script>

<style scoped>
.new_room_modal-container {
  position: absolute;
  top: 0px;
  left: 0px;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.6);
}

.new_room_modal {
  width: 400px;
  height: 200px;

  position: absolute;
  top: -300px;
  left: 50%;
  translate: -50% 0px;
  

  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 10px 2px black;

  transition-property: top;
  transition-duration: 180ms;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.new_room_modal.active {
  top: 50%;
  translate: -50% -50%;
}

.new_room_modal > * {
  width: 70%;
}

.room_name-label {
  font-size: 500;
  font-style: italic;
  color: rgb(41, 41, 41);
}

.room_name-input {
  height: 25px;
  border-radius: 5px;
  border: 1px solid gray;
  color: rgb(41, 41, 41);
}

.buttons-container {
  height: 25px;
  display: flex;
  justify-content: space-around;
}

.buttons-container > button {
  height: 100%;
  border-radius: 5px;
  font-weight: 600;
}

button.confirm {
  color: rgb(0, 63, 0);
  background-color: rgb(178, 221, 178);
  border: 2px solid rgb(0, 63, 0);
}

button.cancel {
  color: rgb(112, 0, 0);
  background-color: rgb(221, 178, 178);
  border: 2px solid rgb(112, 0, 0);
}

.users {
    width: 240px;
    height: 100%;
    background-color: rgb(113, 149, 202);
    box-shadow: -2px 2px 10px black;
}

.users > ul {
    margin: 0px;
    padding: 0px;

    list-style: none;
}
</style>
