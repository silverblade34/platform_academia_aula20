<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500" @click:outside="closeModal">
            <v-card>
                <v-toolbar color="blue">
                    <span class="px-4 w-full text-center">EDITAR UNIVERSIDAD</span>
                </v-toolbar>
                <v-card-text>
                    <v-col cols="12">
                        <v-text-field label="Nombre*" type="text" v-model="name" color="blue" required variant="outlined" prepend-inner-icon="mdi-text-box"></v-text-field>
                        <v-text-field label="Sigla*" type="text" v-model="initials" color="blue" required variant="outlined" prepend-inner-icon="mdi-signature-text"></v-text-field>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey-lighten-2" variant="tonal" @click="closeModal">
                        Cancelar
                    </v-btn>
                    <v-btn color="blue-lighten-1" variant="tonal" @click="updateUniversity">
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
        objectUniversity: Object,
    },
    emits: ['update-university', 'close-modal'],
    setup(props, { emit }) {
        const dialog = ref(false);
        const name = ref('');
        const initials = ref('');

        watch(() => props.openModal, (newVal) => {
            dialog.value = newVal;
            name.value = props.objectUniversity.name;
            initials.value = props.objectUniversity.initials;
        });

        const updateUniversity = () => {
            emit('update-university', {
                name: name.value,
                initials: initials.value
            })
            closeModal()
        }
        const closeModal = () => {
            emit('close-modal')
        }
        return {
            dialog,
            name,
            initials,
            updateUniversity,
            closeModal
        }
    }
}
</script>