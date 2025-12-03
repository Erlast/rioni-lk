import { createApp } from 'vue';

import router from './router';
import App from './App.vue';

import { createVuetify } from 'vuetify';

import './styles/global.scss';
import './assets/fonts/webfonts/fonts.scss';
import '@mdi/font/css/materialdesignicons.css';
import { rioniIcons } from './assets/icons/rioniIcons.ts';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import 'vuetify/styles';
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light' // 'light' | 'dark' | 'system'
  },
  icons: {
    sets: {
      rioni: rioniIcons
    }
  }
});
const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');
