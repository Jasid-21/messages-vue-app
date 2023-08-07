<template>
  <div class="masterContainer">
    <form class="loginForm" @submit.prevent="submit">
      <h2>Login Form</h2>
      <label for="user">Username:</label>
      <input type="text" name="user" placeholder="Ex: sefirot123" v-model="user">
      <br>
      <label for="pass">Password:</label>
      <input type="password" name="pass" v-model="pass">
      <br>
      <input type="submit" value="Login!">
      <br>
      <span>
        Do not have an account? <router-link to="/register">Signup!!</router-link>
      </span>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';

export default {
  name: 'LoginView',
  setup() {
    const store = useStore();
    const router = useRouter();
    const base_url = store.state.base_url;
    const user = ref('');
    const pass = ref('');

    const submit = async () => {
      const url = `${base_url}/auth/login`;
      const json = { username: user.value, password: pass.value };
      const resp = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(json),
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      console.log(resp.status);
      const ok = resp.ok;
      console.log(ok);

      if (!ok) {
        Swal.fire({
          title: 'Error message',
          text: resp.statusText,
          icon: 'error',
        });
        return;
      }

      const data = await resp.json()
      console.log(data);
      localStorage.setItem('MSG_jwt_token', 'Bearer ' + data.token);
      localStorage.setItem('MSG_username', user.value);
      localStorage.setItem('MSG_user_id', data.Id);

      router.replace('/');
    }

    return {user, pass, submit}
  }
}
</script>

<style scoped>
.masterContainer {
  height: calc(100% - 80px);

  display: flex;
  justify-content: center;
  align-items: center;
}

.loginForm {
  width: 240px;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 2px 2px 5px black;;
}

.loginForm > h2 {
  margin: 0px;
  margin-bottom: 20px;
  text-align: center;
}

.loginForm > input {
  width: 100%;
  height: 25px;

  margin-bottom: 20px;

  -moz-box-sizing:border-box;
  -webkit-box-sizing:border-box;
  box-sizing:border-box;
}

.loginForm > input[type='submit'] {
  width: 100%;
  background-color: rgb(55, 133, 55);
  border: 2px solid rgb(17, 54, 17);
  border-radius: 7px;
  color: white;
  font-weight: 700;
  text-shadow: 1px 1px 3px rgb(0, 36, 0);
}
</style>