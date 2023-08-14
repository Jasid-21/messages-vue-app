import { createStore } from 'vuex'

export default createStore({
  state: {
    base_url: '',
    base_ws_url: '',
    io: {},
    rooms: [],
    clients: [],
    currentRoom: {},
  },
  mutations: {
    set_current_room: (state, payload) => {
      const room = state.rooms.find((r) => r.Id == payload);
      if (!room) return;
      console.log(room);
      state.currentRoom = room;
    },

    set_socket: (state, payload) => {
      state.io = payload;
      console.log(state.io);
    },

    set_rooms: (state, payload) => {
      console.log(payload);
      const rooms = payload;
      rooms.forEach((r) => {
        r.messages = r.messages.reverse();
      });
      state.rooms = rooms;
    },

    add_room: (state, payload) => {
      state.rooms.push(payload);
    },

    set_clients: (state, payload) => {
      state.clients = payload;
      console.log(payload);
    },

    add_client: (state, payload) => {
      console.log(state.clients);
      const index = state.clients.findIndex((client) => client.user_id == payload.user_id);

      if (index == -1) {
        state.clients.push(payload);
      } else {
        state.clients[index] = payload;
      }

      console.log(state.clients);
    },

    add_message: (state, msg) => {
      console.log(msg);
      const room_id = msg.room.Id;
      const room = state.rooms.find((r) => r.Id == room_id);
      if (!room) return;
      room.messages.push(msg);

      console.log(state.currentRoom.messages);
    }
    
  },
  actions: {
    add_message({ state, commit }, msg) {
      const msg_room_id = msg.room.Id;
      const msg_room = state.rooms.find((r) => r.Id == msg_room_id);
      if (!msg_room) {
        const room = { ...msg.room, messages: [] };
        state.rooms.push(room);
      }

      commit('add_message', msg);
    }
  },
  modules: {
  }
})
