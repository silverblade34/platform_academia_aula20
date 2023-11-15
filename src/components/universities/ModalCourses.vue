<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="580" @click:outside="closeModal">
            <v-card>
                <v-toolbar color="blue">
                    <span class="px-4 w-full text-center">Lista de cursos</span>
                </v-toolbar>
                <v-card-text>
                    <v-col cols="12">
                        <v-alert v-for="item in dataCourses" :key="item.id" border="start" variant="tonal"
                            color="cyan-darken-2" density="compact" class="text-xs my-1">
                            <div class="w-full grid grid-cols-5">
                                <span class="col-span-4">{{ item.course.name }}</span>
                                <span class="col-span-1">Preguntas: {{ item.examQuestions }}</span>
                            </div>
                        </v-alert>
                        <div class="w-full grid grid-cols-5 text-xs pt-3 pl-2">
                            <span class="col-span-4">Total de cursos: {{ totalCourses }}</span>
                            <span class="col-span-1">Preguntas: {{ totalQuestions }}</span>
                        </div>
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
        const totalCourses = ref('');
        const totalQuestions = ref('');

        watch(() => props.openModal, (newVal) => {
            dialog.value = newVal;
            dataCourses.value = props.data;
            totalCourses.value = props.data.length
            // Calcular el total de preguntas
            const totalQuestionsValue = props.data.reduce((total, course) => {
                return total + (course.examQuestions || 0); // Asegurarse de sumar un valor numérico
            }, 0);

            totalQuestions.value = totalQuestionsValue;
        });

        const closeModal = () => {
            emit('close-modal')
        }
        return {
            dialog,
            dataCourses,
            totalQuestions,
            totalCourses,
            closeModal
        }
    }
}
</script>