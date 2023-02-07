<template>
    <div class="masterContainer">
      <form class="loginForm" @submit.prevent="submit">
        <h2>Register Form</h2>
        <label for="user">Username:</label>
        <input type="text" name="user" placeholder="Ex: sefirot123" v-model="user" required>
        <br>
        <label for="pass">Password:</label>
        <input type="password" name="pass" v-model="pass" required>
        <br>
        <label for="conf">Confirm password:</label>
        <input type="password" name="conf" v-model="conf" required>
        <br>
        <input type="submit" value="Register!">
        <br>
        <span>
          Alredy have an account? <router-link to="/login">Login!!</router-link>
        </span>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from '@vue/reactivity';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'LoginView',
    setup() {
      
      const submit = () => {
        console.log(user.value);
        console.log(pass.value);

        if (pass.value != conf.value) {
            alert("Passwords doesn't match...");
        }
  
        const url = `/register?username=${user.value}&password=${pass.value}`;
        fetch(url, {method: 'POST'})
        .then(resp => {
          if (resp.status != 200) {
            console.log(resp.status);  
          }
  
          return resp.json();
        }).then(data => {
          console.log(data);
          if (data.msg) {
            alert(data.msg);
            return;
          }
  
          localStorage.setItem('MSG_token', data.token);
          localStorage.setItem('MSG_user_id', data.user_id);
          localStorage.setItem('MSG_username', user.value);
  
          router.replace('/');
        });
      }

      const router = useRouter();
      const user = ref('');
      const pass = ref('');
      const conf = ref('');
  
      return {user, pass, conf, submit}
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

  .loginForm > span {
    font-size: 15px;
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