<template>
    <div class="flex w-full h-screen overflow-y-hidden">
        <div class="left">
            <h1 class="animation a1 title font-bold">MonitorS4</h1>
            <img src="../../assets/login/logo-sysnet.png" class="animation a6" style="margin: 0 auto 10px;width: 150px">
            <div class="header">
                <p class="animation a2"></p>
            </div>
            <div class="flex justify-center">
                <form id="login-form" class="lg:w-[80%] w-full flex flex-col justify-center text-center">
                    <div class="text-subtitle-1 text-medium-emphasis text-start">Usuario</div>

                    <v-text-field color="deep-purple-lighten-2" density="compact" placeholder="Ingrese su usuario"
                        prepend-inner-icon="mdi mdi-account" variant="outlined" v-model="username"></v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                        Contraseña

                        <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer"
                            target="_blank">
                            Olvidaste tu contraseña?</a>
                    </div>
                    <v-text-field color="deep-purple-lighten-2" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'" density="compact" placeholder="Ingrese su contraseña"
                        prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                        v-model="password"></v-text-field>
                    <div>
                        <v-col cols="auto">
                            <v-btn size="large" color="deep-purple" @click="validateCredential">Ingresar</v-btn>
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
import { onMounted, ref } from "vue"
/* eslint-disable */ 
import { loginApi } from '@/services/login/LoginService';

export default ({
    setup() {
        const username = ref('');
        const password = ref('');
        onMounted(() => {

        })
        const validateCredential = () => {
            console.log("---------VALIDANDO CREDENCIALES------------")
            console.log(username.value)
            console.log(password.value)
            loginApi(username.value, password.value)
                .then(response => {
                    console.log(response.data)
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
@import url('https://fonts.googleapis.com/css2?family=Tilt+Warp&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cabin&display=swap');


.left {
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
    margin-top: -50px;

}

#right {
    width: 100%;
    margin: 0;
    flex: 1;
    background-color: rgba(72, 128, 150, 0.418);
    transition: 1s;
    background-image: url('../../assets/login/portada_aula20.jpg');
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

.animation.title {
    text-align: center;
    color: #535699;
    font-family: 'Poppins', sans-serif;
    font-size: 40px;
}

.a1 {
    -webkit-animation-delay: .9s;
    animation-delay: .9s;
}

.a2 {
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
}

.a3 {
    -webkit-animation-delay: 1.2s;
    animation-delay: 1.2s;
}

.a4 {
    -webkit-animation-delay: 1.4s;
    animation-delay: 1.4s;
}

.a5 {
    -webkit-animation-delay: 1.6s;
    animation-delay: 1.6s;
}

.a6 {
    -webkit-animation-delay: 1.8s;
    animation-delay: 1.8s;
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
  