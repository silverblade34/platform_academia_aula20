<template>
    <div class="sidebarComponent">
        <div id="side-bar" class="sidebar h-full flex flex-col text-sm pt-3"
            :class="dataOpenSideBar == true ? 'side-bar-visible' : 'side-bar-close'">
            <div class="w-full px-3 pt-5 pb-8 relative">
                <div class="w-full">
                    <div class="flex justify-center items-center">
                        <img src="../assets/login/logo_aula20.png" alt="" class="w-[8rem] rounded-md">
                    </div>
                    <!-- <span class="md:hidden lg:block title_empresa text-center pt-3"> {{ empresa }} </span> -->
                </div>
                <div class="lg:flex lg:justify-end lg:items-center py-5 text-blue-600 open_close_sidebar md:hidden"
                    @click="clickHambuger">
                    <i class="fa-solid fa-circle-arrow-left fa-2xl cursor-pointer"></i>
                </div>
            </div>
            <nav class="nav overflow-y-auto h-full">
                <NavItem class="p-2 py-2" :item="item" v-for="item in navItems" :key="item.label"
                    :expandido="dataOpenSideBar" />
            </nav>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import NavItem from '@/components/generales/NavItem.vue';
import store from '@/store';

export default {
    props: {
        dataOpenSideBar: Boolean,
        clickHambuger: Function,
    },
    components: { NavItem },
    setup() {
        const navItems = ref([]);
        if (store.state.rol == "ALUMNO") {
            navItems.value = [
                {
                    to: "/dashboard",
                    label: "Dashboard",
                    children: [],
                    icon: "fa-solid fa-chart-pie mr-2"
                },
                {
                    to: "/cursos",
                    label: "Cursos",
                    children: [],
                    icon: "fa-solid fa-book-open mr-2"
                },
                // {
                //     to: "/simulacro",
                //     label: "Simulacro",
                //     children: [],
                //     icon: "fa-solid fa-graduation-cap mr-2"
                // },
                // {
                //     to: "/reporte",
                //     label: "Reporte",
                //     children: [],
                //     icon: "fa-solid fa-table mr-2"
                // }
            ]
        } else if (store.state.rol == "PROFESOR") {
            navItems.value = [
                {
                    to: "/especialidades",
                    label: "Especialidades",
                    children: [],
                    icon: "fa-solid fa-book-open mr-2"
                }
            ]
        } else if (store.state.rol == "ADMINISTRADOR") {
            navItems.value = [
                {
                    to: "/dashboard_admin",
                    label: "Dashboard",
                    children: [],
                    icon: "fa-solid fa-chart-pie mr-2"
                },
                {
                    to: "/sedes",
                    label: "Sedes",
                    children: [],
                    icon: "fa-solid fa-map-location-dot mr-2"
                },
                {
                    to: "",
                    label: "Usuarios",
                    children: [
                        {
                            to: "/profesores",
                            label: "Profesores",
                            children: [],
                            icon: "fa-solid fa-person-chalkboard mr-2"
                        },
                        {
                            to: "/alumnos",
                            label: "Alumnos",
                            children: [],
                            icon: "fa-solid fa-graduation-cap mr-2"
                        },
                    ],
                    icon: "fa-solid fa-users mr-2"
                },
                {
                    to: "",
                    label: "Asignación",
                    children: [
                        {
                            to: "/universidades",
                            label: "Universidades",
                            children: [],
                            icon: "fa-solid fa-building-columns mr-2"
                        },
                        {
                            to: "/cursosadmin",
                            label: "Cursos",
                            children: [],
                            icon: "fa-solid fa-book-open mr-2"
                        }
                    ],
                    icon: "fa-solid fa-bezier-curve mr-2"
                }
            ]
        }
        return { navItems };
    },
}
</script>
<style lang="scss">
.sidebarComponent {
    max-height: 100vh;
    /* Establece la altura máxima al 100% del viewport height */
    box-shadow: 1px 0px 5px 1px rgba(117, 117, 117, 0.09);
    -webkit-box-shadow: 1px 0px 5px 1px rgba(117, 117, 117, 0.09);
    -moz-box-shadow: 1px 0px 5px 1px rgba(117, 117, 117, 0.09);
}

.loader {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite
}

.loader::before,
.loader::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid #FFF;
    animation: prixClipFix 2s linear infinite;
}

.loader::after {
    inset: 8px;
    transform: rotate3d(90, 90, 0, 180deg);
    border-color: #FF3D00;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg)
    }

    100% {
        transform: rotate(360deg)
    }
}

@keyframes prixClipFix {
    0% {
        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)
    }

    50% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)
    }

    75%,
    100% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)
    }
}


.overflay {
    height: 100%;
    width: 100vw;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    left: 0;
    background-color: #9191918f;
    z-index: 9999;
}

.sidebar {
    overflow: hidden;
    transition: 300ms;
    background-color: var(--fondosidebar);

    .button-link span {
        transition: all 0.3s;
    }

    .btn-logout {
        background-color: #517ee0;
        transition: all 0.5s;

        &:hover {
            background-color: #1e53c5;
            ;
        }
    }
}


.side-bar-visible {
    width: 230px !important;
    min-width: 230px !important;

    .open_close_sidebar {
        position: fixed;
        top: 2.6rem;
        left: 215px;
        height: 25px;
        z-index: 9999;
        transition: 300ms;
    }

    .title_empresa {
        display: block;
        font-size: 17px;
        font-weight: 500;
    }

}

.side-bar-close {
    width: 70px !important;
    min-width: 70px !important;

    .title_empresa {
        display: none;
    }

    .btn-logout {
        transition: all 0.6s;
        overflow: hidden;

        span {
            transition: all 0.6s;
        }
    }

    .open_close_sidebar {
        position: fixed;
        top: 2.6rem;
        left: 55px;
        height: 25px;
        z-index: 9999;
        transform: rotate(180deg);
        transition: 300ms;
    }

    .button-link {
        .icono_arrow {
            font-size: 10px;
            padding-left: 5px;
        }

        justify-content: center;

        i {
            color: rgb(184, 184, 184);
            font-size: 15px;
            margin-right: 0;
        }

        &.router-link-exact-active {
            color: #0b46c4 !important;

            i {
                color: #0b46c4 !important;
            }
        }
    }

    .button-link span {
        display: none;
    }
}
</style>