<template>
  <div id="app">
    <h1>WebSocket Chat</h1>
    <div v-if="connected">
      <input v-model="messageInput" placeholder="Enter message" @keyup.enter="sendMessage">
      <button @click="sendMessage">Send</button>
    </div>
    <div v-else>
      <p>Connecting...</p>
    </div>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
    </ul>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'App',
  data() {
    return {
      socket: null,
      connected: false,
      messageInput: '',
      messages: []
    };
  },
  created() {
    this.socket = io('http://localhost:3000'); // Замените на адрес вашего сервера, если он отличается

    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.connected = true;
    });

    this.socket.on('message', (data) => {
      console.log('Message received:', data);
      this.messages.push(data);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.connected = false;
    });
  },
  methods: {
    sendMessage() {
      if (this.messageInput.trim() !== '') {
        this.socket.emit('message', this.messageInput);
        this.messages.push('You: ' + this.messageInput);
        this.messageInput = '';
      }
    }
  }
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
