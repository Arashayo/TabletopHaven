import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import "./styles/main.css"
// import io from 'socket.io-client';

// const socket = io(); // Create connection to server

const app = createApp(App);

// // Mount the app and provide socket instance to all components
// app.config.globalProperties.$socket = socket;

app.use(router).mount('#app');
