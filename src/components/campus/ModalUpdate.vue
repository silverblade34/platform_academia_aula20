<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500" @click:outside="closeModal">
            <v-card>
                <v-toolbar color="blue">
                    <span class="px-4 w-full text-center">Editar sede</span>
                </v-toolbar>
                <v-card-text>
                    <v-col cols="12">
                        <v-text-field label="Nombre*" type="text" v-model="name" color="blue" required></v-text-field>
                        <v-text-field label="Dirección*" type="text" v-model="address" color="blue" required></v-text-field>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey-lighten-2" variant="tonal" @click="closeModal">
                        Cancelar
                    </v-btn>
                    <v-btn color="blue-lighten-1" variant="tonal" @click="updateCampus">
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { ref, watch } from 'vue'
export default {
    props: {
        openModal: Boolean,
        objectCampus: Object,
    },
    emits: ['update-campus', 'close-modal'],
    setup(props, { emit }) {
        const dialog = ref(false);
        const name = ref('');
        const address = ref('');

        watch(() => props.openModal, (newVal) => {
            dialog.value = newVal;
            name.value = props.objectCampus.name;
            address.value = props.objectCampus.address;
        });

        const updateCampus = () => {
            emit('update-campus', {
                name: name.value,
                address: address.value
            })
            closeModal()
        }
        const closeModal = () => {
            emit('close-modal')
        }
        return {
            dialog,
            name,
            address,
            updateCampus,
            closeModal
        }
    }
}
</script>