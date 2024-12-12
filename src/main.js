import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router';

// Create Vue app
const app = createApp(App);

// Create Pinia store
const pinia = createPinia();

// Use plugins
app.use(router);
app.use(pinia);

// Mount app
app.mount('#app');