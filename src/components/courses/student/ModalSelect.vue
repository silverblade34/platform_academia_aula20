<template>
    <div class="text-center">
        <v-btn class="text-none ms-4 text-white" color="blue-darken-1" rounded="2" @click="dialog = true">
            Realizar examen
        </v-btn>
        <v-dialog v-model="dialog" width="700">
            <v-card>
                <v-toolbar color="blue">
                    <span class="px-4 w-full text-center">Seleccionar temarios que deseas evaluar</span>
                </v-toolbar>
                <v-card-text>
                    <div class=" bg-gray-100 w-full rounded-lg my-2 flex gap-2 px-3" v-for="syllabus in syllabusdata"
                        :key="syllabus.id">
                        <v-checkbox :label="syllabus.name" color="secondary" :value="syllabus.id" hide-details
                            class="text-xs" v-model="selectedSyllabus"></v-checkbox>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey-lighten-2" variant="tonal" @click="dialog = false">
                        Cancelar
                    </v-btn>
                    <v-btn color="blue-lighten-1" variant="tonal" @click="onGenerateEvaluation">
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { ref } from 'vue';
import store from '@/store';

export default {
    props: {
        id: String,
        syllabusdata: Array
    },
    emits: ['generate-evaluation'],
    setup(props, { emit }) {
        const selectedSyllabus = ref([]);
        const dialog = ref(false);

        const onGenerateEvaluation = () => {
            const data = {
                listSyllabusId: selectedSyllabus.value,
                courseId: props.id,
                studentcode: store.state.codigo
            }
            dialog.value = false
            emit('generate-evaluation', data)
        }
        return {
            dialog,
            selectedSyllabus,
            onGenerateEvaluation
        }
    }
}
</script>