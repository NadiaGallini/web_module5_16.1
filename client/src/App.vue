<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :msg="messageFromServer"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import io from 'socket.io-client';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      socket: null,
      messageFromServer: ''
    };
  },
  mounted() {
    // Подключение к серверу
    this.socket = io('http://localhost:3000'); // Замените на адрес вашего сервера

    // Подписка на событие подключения
    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.messageFromServer = 'Connected to server';
    });

    // Подписка на событие отключения
    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.messageFromServer = 'Disconnected from server';
    });

    // Пример обработчика события от сервера
    this.socket.on('messageFromServer', (message) => {
      console.log('Message from server:', message);
      this.messageFromServer = message;
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
