<template>
    <nav>
        <router-link to="/">
            <h1 class="logo">Chat App</h1>
        </router-link>

        <router-link v-if="logged" to="/login" @click="logout" >
            <h3>Logout</h3>
        </router-link>

        <router-link v-else to="/login">
            <h3>Login</h3>
        </router-link>
    </nav>
</template>

<script>
import { ref } from '@vue/reactivity';
import { onMounted } from 'vue';
export default {
    name: 'Navbar',
    setup() {
        const logged = ref(false);
        const token = localStorage.getItem('MSG_jwt_token');

        const logout = () => {
            const url = `/logout?token=${token}`;
            fetch(url, {method: 'POST'})
            .then(resp => {
                if (resp.status == 200) {
                    localStorage.removeItem('MSG_user_id');
                    localStorage.removeItem('MSG_token');
                    localStorage.removeItem('MSG_username');
                }
            })
        }

        if (token) {
            logged.value = true;
        }

        return {logged, logout};
    }
}
</script>

<style scoped>
nav {
  height: 78px;
  background-color: rgb(140, 189, 140);
  border-bottom: 2px solid rgb(26, 59, 26);

  display: flex;
  align-items: center;
}

a {
    text-decoration: none;
    margin-left: 60px;
}

a > h3 {
    color: rgb(5, 49, 5);
    font-size: 18px;
}
.logo {
    margin: 0px;
    font-size: 35px;
    color: white;
    text-shadow: 2px 2px 5px rgb(11, 32, 11);
}
</style>