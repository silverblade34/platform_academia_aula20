<template>
    <h1 class="font-bold text-xl text-gray-500 title-views pb-5">Resultados del examen - {{
        courseName }}</h1>
    <div class="w-full grid grid-cols-8 gap-5">
        <div class="bg-white col-span-6 shadow p-5 rounded-lg text-sm">
            <div class="pb-3 flex justify-between">
                <span class="font-bold text-lg text-teal-400 title-views ">Preguntas</span>
                <span>
                    <v-icon color="teal-lighten-1">mdi-circle</v-icon><span class="text-gray-500 pr-3"> CORRECTAS</span>
                    <v-icon color="grey-lighten-2">mdi-circle</v-icon> <span class="text-gray-500">INCORRECTAS</span>
                </span>
            </div>
            <v-expansion-panels>
                <v-expansion-panel v-for="(question, i) in courseQuestion" :key="i">
                    <v-expansion-panel-title :color="question.state ? 'teal-lighten-1' : 'grey-lighten-2'">
                        <span>Pregunta {{ (i + 1) }}</span>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <div class="w-full text-xs">
                            <div>
                                {{ question.question.description }}
                                <img :src="'http://localhost:3000/api/v1/questions/getImage/' + question.question.imageQuestion"
                                    alt="" class="max-w-[300px]">
                            </div>
                            <div class="pt-5">
                                <p><span class="font-bold"> Descripción respuesta: </span>{{
                                    question.question.descriptionAnswer }}</p>
                                <div class="pt-4">
                                    <span class="font-bold">Solución: </span> <v-btn color="green" size="small"
                                        @click="viewImage(question.question.imageAnswer)" class="ml-3">
                                        Ver solución <v-icon>mdi-image</v-icon> </v-btn>
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
        <div class="col-span-2 w-full mb-5 lg:mb-0">
            <div class=" bg-white p-5 rounded-lg text-sm shadow">
                <div class="pb-3">
                    <router-link :to="'/cursos'">
                        <v-btn color="blue" variant="tonal" class="w-full">
                            SALIR
                        </v-btn>
                    </router-link>
                </div>
                <h2 class="font-bold text-lg text-teal-400 pb-3 title-views">Resumen de examen</h2>
                <p class="my-2 text-gray-500 ">Alumno: {{ studentName }} </p>
                <p class="my-2 text-gray-500 ">Curso: {{ courseName }} </p>
                <p class="my-2 text-gray-500 ">Hora inicio: {{ startTime }} </p>
                <p class="my-2 text-gray-500 ">Hora fin: {{ endTime }} </p>
                <p class="my-2 text-gray-500 ">Tiempo brindado: {{ timeGiven }} </p>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { findOneCourseEvaluationApi } from '@/api/student/CourseService';
import Swal from 'sweetalert2';

export default ({
    props: {
        id: String
    },
    setup(props) {
        const baseURL = process.env.VUE_APP_BASE_URL;
        const courseEvaluationId = ref('');
        const courseEvaluationResult = ref({})
        const courseName = ref('');
        const courseQuestion = ref([]);
        const studentName = ref('');
        const startTime = ref('');
        const endTime = ref('');
        const timeGiven = ref('');

        onMounted(() => {
            courseEvaluationId.value = props.id
            findOneCourseEvaluationApi(courseEvaluationId.value)
                .then(response => {
                    console.log(response.data.data)
                    courseEvaluationResult.value = response.data.data
                    courseName.value = courseEvaluationResult.value.course.name
                    studentName.value = courseEvaluationResult.value.student.name + " " + courseEvaluationResult.value.student.lastName
                    courseQuestion.value = courseEvaluationResult.value.courseQuestion
                    startTime.value = courseEvaluationResult.value.startTime
                    endTime.value = courseEvaluationResult.value.formattedCreatedAt
                    timeGiven.value = courseEvaluationResult.value.timeGiven
                })
        })

        const viewImage = (pathImage) => {
            if (!pathImage) {
                Swal.fire({
                    text: 'No hay una imagen cargada',
                    showCloseButton: true,
                    confirmButtonColor: '#3b82f6',
                });
                return; // Sale de la función si no hay una imagen cargada
            }

            const imageUrl = `${baseURL}/questions/getImage/${pathImage}`;

            Swal.fire({
                imageUrl: imageUrl,
                imageAlt: 'Imagen',
                showCloseButton: true,
                confirmButtonColor: '#3b82f6',
            });
        };

        return {
            courseEvaluationId,
            courseEvaluationResult,
            courseQuestion,
            courseName,
            studentName,
            startTime,
            endTime,
            timeGiven,
            viewImage
        }
    }
})
</script>