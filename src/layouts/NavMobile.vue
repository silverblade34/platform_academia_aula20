<template>
    <v-layout class="overflow-visible" style="height: 56px;">
        <v-bottom-navigation v-model="value" active color="primary">
            <NavItemMobile v-for="item in navItems" :key="item.text" :item="item" />
        </v-bottom-navigation>
    </v-layout>
</template>
<script>
import { ref } from 'vue';
import NavItemMobile from '@/components/generales/NavItemMobile.vue';
import store from '@/store';

export default ({
    name: "NavMobile",
    components: {
        NavItemMobile
    },
    data: () => ({ value: 0 }),
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
                {
                    to: "/simulacro",
                    label: "Simulacro",
                    children: [],
                    icon: "fa-solid fa-graduation-cap mr-2"
                },
                {
                    to: "/reporte",
                    label: "Reporte",
                    children: [],
                    icon: "fa-solid fa-table mr-2"
                }
            ]
        } else if (store.state.rol == "PROFESOR") {
            navItems.value = [
                {
                    to: "/especialidades",
                    label: "Especialidades 123",
                    children: [],
                    icon: "fa-solid fa-book-open mr-2"
                }
            ]
        } else if (store.state.rol == "ADMINISTRADOR") {
            navItems.value = [
                {
                    to: "/dashboard_admin",
                    label: "Dashbo..",
                    children: [],
                    icon: "mdi-view-dashboard"
                },
                {
                    to: "/sedes",
                    label: "Sedes",
                    children: [],
                    icon: "mdi-map-marker-radius"
                },
                {
                    to: "/universidades",
                    label: "Univers..",
                    children: [],
                    icon: "mdi-town-hall"
                },
                {
                    to: "",
                    label: "Usuar..",
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
                    icon: "mdi-account-group"
                }
            ]
        }
        return { navItems };
    },
})
</script>