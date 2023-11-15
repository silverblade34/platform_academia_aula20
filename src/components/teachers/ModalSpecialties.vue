<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="580" @click:outside="closeModal">
            <v-card>
                <v-toolbar color="blue">
                    <span class="px-4 w-full text-center">Lista de especialidades</span>
                </v-toolbar>
                <v-card-text>
                    <v-col cols="12">
                        <v-alert v-for="item in dataCourses" :key="item.id" border="start" variant="tonal"
                            color="cyan-darken-2" class="text-sm my-1">
                            <div class="w-full grid grid-cols-5">
                                <span class="col-span-4">{{ item.name }}</span>
                            </div>
                        </v-alert>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-lighten-1" variant="tonal" @click="closeModal">
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
        data: Array,
    },
    emits: ['update-item', 'close-modal'],
    setup(props, { emit }) {
        const dialog = ref(false);
        const dataCourses = ref([]);

        watch(() => props.openModal, (newVal) => {
            dialog.value = newVal;
            dataCourses.value = props.data;
        });

        const closeModal = () => {
            emit('close-modal')
        }
        return {
            dialog,
            dataCourses,
            closeModal
        }
    }
}
</script>