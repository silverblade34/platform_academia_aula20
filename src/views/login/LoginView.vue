<template>
    <div class="flex w-full h-screen overflow-y-hidden">
        <div class="left">
            <img src="../../assets/login/logo_aula20.png" class="animation a6 pb-10"
                style="margin: 0 auto 10px;width: 220px">
            <div class="flex justify-center">
                <form id="login-form" class="lg:w-[80%] w-full flex flex-col justify-center text-center">

                    <span class="text-gray-600 pb-1 label text-start">Usuario</span>
                    <v-text-field color="teal-lighten-2" density="compact" placeholder="Ingrese su usuario"
                        prepend-inner-icon="mdi mdi-account" variant="outlined" v-model="username"></v-text-field>
                    <div class="flex justify-between">
                        <span class="text-gray-600 pb-1 label">Contraseña</span>
                        <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer"
                            target="_blank">
                            Olvidaste tu contraseña?</a>
                    </div>
                    <v-text-field color="teal-lighten-2" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'" density="compact" placeholder="Ingrese su contraseña"
                        prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                        v-model="password"></v-text-field>
                    <div>
                        <v-col cols="auto">
                            <v-btn size="large" color="teal-lighten-1" @click="validateCredential">Ingresar</v-btn>
                        </v-col>
                    </div>
                </form>
            </div>
        </div>
        <div id="right">
        </div>
    </div>
</template>
  
<script>
import { ref } from "vue"
import { loginApi } from '@/api/login/LoginService';
import { basicAlert } from '@/helpers/SweetAlert';
import store from '@/store';
import { useRouter } from 'vue-router';

export default ({
    setup() {
        const username = ref('');
        const password = ref('');
        const router = useRouter();

        const validateCredential = async () => {
            await loginApi(username.value, password.value)
                .then(response => {
                    if (response.data.status == true) {
                        store.commit('setUsuario', response.data.data.username);
                        store.commit('setRol', response.data.data.rol);
                        store.commit('setCodigo', response.data.data.codigo);
                        store.commit('setIdUser', response.data.data.id);
                        store.commit('setIsAuthenticated', true);
                        router.push('/');

                    } else {
                        basicAlert(() => { }, 'warning', 'Credenciales incorrectas', 'Verifique su usuario y contraseña')
                    }
                })
                .catch(() => {
                    basicAlert(() => { }, 'error', 'Error de conexión', 'Hubo un problema de conexión con el origen de datos')
                })
        }
        return {
            validateCredential,
            username,
            password
        }
    },
    data: () => ({
        visible: false,
    }),
})
</script>
  
<style scoped lang="scss">
.left {
    font-family: 'Poppins', sans-serif;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    -webkit-animation-name: left;
    animation-name: left;
    -webkit-animation-duration: .8s;
    animation-duration: .8s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-delay: .5s;
    animation-delay: .5s;
}

#right {
    width: 100%;
    margin: 0;
    flex: 1;
    background-color: rgba(72, 128, 150, 0.418);
    transition: 1s;
    background-image: url('../../assets/login/portada_login_3.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-position: center center;
}

#right:before {
    content: '';
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    background: rgba(38, 116, 212, 0.6);
}

.header>h2 {
    margin: 0;
    color: #535699;
    text-align: center;
}

.header>p {
    margin-top: 10px;
    font-weight: normal;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.4);
    line-height: 1.5;
    text-align: justify;
}


.animation {
    -webkit-animation-name: fadeInUp;
    animation-name: fadeInUp;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

.a6 {
    -webkit-animation-delay: 1.8s;
    animation-delay: 1.3s;
}

@-webkit-keyframes fadeInUp {
    from {
        opacity: 0;
        -webkit-transform: translate3d(0, 30%, 0);
        transform: translate3d(0, 30%, 0);
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        -webkit-transform: translate3d(0, 30%, 0);
        transform: translate3d(0, 30%, 0);
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

@-webkit-keyframes left {
    0% {
        opacity: 0;
        width: 0;
    }

    100% {
        opacity: 1;
        padding: 20px 40px;
        width: 500px;
    }
}

@keyframes left {
    0% {
        opacity: 0;
        width: 0;
    }

    100% {
        opacity: 1;
        padding: 20px 40px;
        width: 500px;
    }
}
</style>
  