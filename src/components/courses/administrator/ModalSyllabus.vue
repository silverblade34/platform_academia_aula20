<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="580" @click:outside="closeModal">
            <v-card>
                <v-toolbar color="blue">
                    <span class="px-4 w-full text-center">Lista de temarios</span>
                </v-toolbar>
                <v-card-text>
                    <v-col cols="12">
                        <v-expansion-panels>
                            <v-expansion-panel v-for="item in dataSyllabus" :key="item.name">
                                <v-expansion-panel-title>{{ item.name }}</v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <div class="w-full text-xs">
                                        {{ item.description }}
                                    </div>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-lighten-1" variant="tonal">
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
        const dataSyllabus = ref([]);

        watch(() => props.openModal, (newVal) => {
            dialog.value = newVal;
            dataSyllabus.value = props.data;
        });

        const closeModal = () => {
            emit('close-modal')
        }
        return {
            dialog,
            dataSyllabus,
            closeModal
        }
    }
}
</script>