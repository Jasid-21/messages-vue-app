<template>
  <div class="users">
    <ul>
      <ActiveUser v-for="(c, idx) of clients" :key="idx" :client="c" />
    </ul>
  </div>
</template>

<script>
import ActiveUser from './ActiveUser.vue';

export default {
    name: 'ConnectedUsers',
    props: ['clients'],
    components: {
      ActiveUser
    }
}
</script>

<style scoped>
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
