import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

//Importamos las rutas
import router from './router';

// Importamos el store
import store from './store'
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'; // Importa los estilos CSS de los iconos

const vuetify = createVuetify({
    components,
    directives,
});

// Llamar a la acción para inicializar el estado desde localStorage
store.dispatch('initializeStateFromLocalStorage');

const app = createApp(App);
app.use(vuetify);
app.use(router).use(store).mount('#app');
