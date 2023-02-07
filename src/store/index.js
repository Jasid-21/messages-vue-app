import { createStore } from 'vuex'

export default createStore({
  state: {
    io: {},
    rooms: [],
    clients: [],
    currentRoom: {}
  },
  mutations: {
    set_current_room: (state, payload) => {
      for (var room of state.rooms) {
        if (room.room_id == payload) {
          state.currentRoom = room;

          break;
        }
      }
    },

    set_socket: (state, payload) => {
      state.io = payload;
      console.log(state.io);
    },

    set_rooms: (state, payload) => {
      console.log(payload);
      state.rooms = payload;
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

    add_message: (state, {room, room_id, msg}) => {
      console.log(msg);

      for (var r of state.rooms) {
        if (r.room_id == room_id) {
          r.messages.push(msg);
          if (state.currentRoom.room_id == room_id) {
            state.currentRoom = r;
          }

          break;
        }
      }

      console.log(state.currentRoom.messages);
    }
    
  },
  actions: {
  },
  modules: {
  }
})
