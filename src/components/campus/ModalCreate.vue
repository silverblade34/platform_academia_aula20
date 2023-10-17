<template>
    <div class="text-center">
        <v-btn class="text-none ms-4 text-white text-sm" color="blue-darken-1" rounded="2" @click="dialog = true">
            Crear nuevo
        </v-btn>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-toolbar color="blue">
                    <span class="px-4 w-full text-center">Crear nueva sede a la academia</span>
                </v-toolbar>
                <v-card-text>
                    <v-col cols="12">
                        <v-text-field label="Nombre*" type="text" v-model="name" color="blue" required></v-text-field>
                        <v-text-field label="Dirección*" type="text" v-model="address" color="blue" required></v-text-field>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey-lighten-2" variant="tonal" @click="dialog = false">
                        Cancelar
                    </v-btn>
                    <v-btn color="blue-lighten-1" variant="tonal" @click="createCampus">
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    emits: ['create-campus'],
    setup(_, { emit }) {
        const dialog = ref(false);
        const name = ref('');
        const address = ref('');
        const createCampus = () => {
            emit('create-campus', {
                name: name.value,
                address: address.value
            })
            name.value = "";
            address.value = "";
            dialog.value = false
        }
        return {
            dialog,
            name,
            address,
            createCampus
        }
    }
}
</script>