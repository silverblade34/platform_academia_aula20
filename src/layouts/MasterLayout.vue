<template>
  <main class="w-full h-screen overflow-hidden block">
    <div class="w-full h-full flex overflow-hidden">
      <SidebarLayout class="sidebarLayout" :dataOpenSideBar="openSidebar" :clickHambuger="toggleSidebar" />
      <div class="w-full h-full overflow-hidden">
        <div class="w-full flex justify-end headerLayout items-center pr-5">
          <v-list class="cursor-pointer">
            <v-list-item class="text-start text-xs" :prepend-avatar="avatarPath" :title="`Hola, ${username}`"
              :subtitle="rol">
            </v-list-item>
          </v-list>
          <MenuAsPopover :username="username" :rol="rol" :avatarPath="avatarPath"/>
        </div>
        <div class="main-container w-full h-full overflow-y-scroll">
          <router-view />
        </div>
      </div>
    </div>
    <NavMobile class="nav-mobile" />
  </main>
  <div class="overflay" v-if="logoutProcessing">
    <span class="loader"></span>
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted } from 'vue';
import SidebarLayout from './SidebarLayout.vue';
import NavMobile from './NavMobile.vue';
import store from '@/store';
import MenuAsPopover from '@/components/generales/MenuAsPopover.vue';
import avatarImage from "@/assets/home/iconuser_hombre.png";

export default {
  components: { SidebarLayout, NavMobile, MenuAsPopover },
  data: () => ({
    avatarPath: avatarImage
  }),
  setup() {
    const username = store.state.usuario;
    const rol = store.state.rol;
    const openSidebar = ref(true);
    const logoutProcessing = ref(false);
    const logoImage = store.state.namelogo;
    onMounted(() => {
      checkWindowWidth(); // Comprobar el ancho de la ventana al cargar el componente
      window.addEventListener('resize', checkWindowWidth); // Escuchar eventos de cambio de tamaño de ventana
    })
    onUnmounted(() => {
      window.removeEventListener('resize', checkWindowWidth); // Eliminar el evento de cambio de tamaño de ventana al desmontar el componente
    })
    const toggleSidebar = () => {
      if (window.innerWidth >= 1000) {
        openSidebar.value = !openSidebar.value; // Abrir el sidebar solo si el ancho de la ventana es mayor o igual a 1000px
      }
    }
    const checkWindowWidth = () => {
      if (window.innerWidth < 1000) {
        openSidebar.value = false; // Cerrar la barra lateral cuando el ancho de la ventana sea menor a 1000px
      } else {
        openSidebar.value = true; // Abrir la barra lateral cuando el ancho de la ventana sea mayor o igual a 1000px
      }
    }

    const logout = () => {
      logoutProcessing.value = true;
      localStorage.clear();
      location.reload();
    }

    return {
      username,
      rol,
      openSidebar,
      logoutProcessing,
      logoImage,
      logout,
      toggleSidebar
    }
  }
}
</script>
  
<style lang="scss">
.sidebarLayout {
  position: sticky;
  top: 0;
  left: 0;
}

.headerLayout {
  position: sticky;
  background-color: transparent;
  top: 0;
  box-shadow: 0px 5px 5px -5px rgba(117, 117, 117, 0.09);
  -webkit-box-shadow: 1px 0px 5px 1px rgba(117, 117, 117, 0.09);
  -moz-box-shadow: 1px 0px 5px 1px rgba(117, 117, 117, 0.09);
}

.main-container {
  background-color: #fafbfd;
  padding: 2rem;
}

.nav-mobile {
  display: none;
}

@media screen and (max-width: 660px) {
  .sidebarLayout {
    display: none;
  }

  .icono-menu {
    display: none;
  }

  .nav-mobile {
    display: block;
  }

  .title-vista {
    font-size: 18px;
  }

  .main-container {
    padding: 1rem;
  }
}
</style>