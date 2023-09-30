<template>
    <div class="text-center">
        <v-menu v-model="menu" :close-on-content-click="false" location="end">
            <template v-slot:activator="{ props }">
                <i v-bind="props"
                    :class="['fa-solid fa-chevron-down fa-sm text-gray-600 cursor-pointer', { rotated: isRotated }]"
                    @click="rotateIcon"></i>
            </template>

            <v-card min-width="150">
                <v-list>
                    <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg" title="John Leider"
                        subtitle="Founder of Vuetify">
                        <template v-slot:append>
                            <v-btn variant="text" :class="fav ? 'text-red' : ''" icon="mdi-heart"
                                @click="fav = !fav"></v-btn>
                        </template>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>
                <v-list>
                    <v-list-item class="px-5">
                        <div class="cursor-pointer transition 
                        ease-in duration-100 flex justify-between rounded-lg items-center text-gray-400 text-sm">
                            <span> Mi cuenta</span>
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </div>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list>
                    <v-list-item class="px-3">
                        <div class="py-2 px-5 bg-red-400 hover:bg-red-500 cursor-pointer transition 
                        ease-in duration-100 flex justify-between rounded-lg items-center text-white text-sm"
                            @click="logout">
                            <span> Cerrar sesión</span>
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </div>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </div>
</template>
<script>
import { ref } from "vue";

export default {
    props: {
        username: String,
        rol: String
    },
    data: () => ({
        fav: true,
        menu: false,
        message: false,
        hints: true
    }),
    setup() {
        const isRotated = ref(false);

        const rotateIcon = () => {
            isRotated.value = !isRotated.value;
        };
        const logout = () => {
            localStorage.clear();
            location.reload();
        }

        return {
            logout,
            rotateIcon
        }
    }
}
</script>
<style lang="scss">
.rotated {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
}

.v-list-item__content {
    .v-list-item-title {
        font-size: 0.8rem !important;
    }

    .v-list-item-subtitle {
        font-size: 0.8rem !important;
    }
}
</style>