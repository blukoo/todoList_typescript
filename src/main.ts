import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueTimepicker from 'vue3-timepicker';
import 'vue3-timepicker/dist/VueTimepicker.css';
import VCalendar from 'v-calendar';

createApp(App).use(store).use(router).use(VueTimepicker).use(VCalendar, {}).mount('#app');
