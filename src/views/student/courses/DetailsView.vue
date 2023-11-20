<template>
    <div class="flex justify-between">
        <h1 class="font-bold text-xl text-gray-500 title-views"> {{ nameCourse }}</h1>
        <ModalSelect :syllabusdata="syllabusData" :id="id" @generate-evaluation="onGenerateEvaluation" />
    </div>
    <div class="py-5">
        <div class="grid grid-cols-2 gap-10">
            <div class="bg-white p-5 rounded-lg shadow">
                <h2 class="title-views text-teal-400 text-lg pb-4">Registro de notas</h2>
                <RecordNotes :desserts="courseEvaluationData" />
            </div>
            <div class="bg-white p-5 rounded-lg shadow">
                <h2 class="title-views text-teal-400 text-lg pb-4">Temarios del curso</h2>
                <div class="p-2 bg-gray-100 w-full rounded-lg px-4 my-2" v-for="syllabus in syllabusData"
                    :key="syllabus.id">
                    <p> {{ syllabus.name }} </p>
                </div>
            </div>
        </div>
    </div>
    <v-dialog v-model="dialogLoader" :scrim="false" persistent width="auto">
        <v-card color="blue">
            <v-card-text>
                Se esta procesando
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import RecordNotes from '@/components/courses/student/RecordNotes.vue';
import ModalSelect from '@/components/courses/student/ModalSelect.vue';
import { findSyllabusCourseApi } from '@/api/teacher/CourseService';
import { findAllCourseEvaluationApi } from '@/api/student/CourseService';
import { useRouter } from 'vue-router';
import { generateCourseEvaluationApi } from '@/api/student/CourseService';
import { onMounted, ref } from 'vue';
import store from '@/store';

export default ({
    props: {
        id: Number,
    },
    components: {
        RecordNotes,
        ModalSelect
    },
    setup(props) {
        const router = useRouter();
        const syllabusData = ref([]);
        const courseEvaluationData = ref([]);
        const nameCourse = ref('');
        const dialogLoader = ref(false);

        onMounted(async () => {
            const [syllabusResponse, courseEvaluationResponse] = await Promise.all([
                findSyllabusCourseApi(props.id),
                findAllCourseEvaluationApi(props.id, store.state.codigo)
            ])
            nameCourse.value = syllabusResponse.data.data.name
            syllabusData.value = syllabusResponse.data.data.syllabus
            courseEvaluationData.value = courseEvaluationResponse.data.data
        })

        const onGenerateEvaluation = (data) => {
            dialogLoader.value = true
            generateCourseEvaluationApi(data)
                .then(response => {
                    console.log(response.data.data)
                    dialogLoader.value = false
                    store.commit('setEvaluationGenerate', response.data.data);
                    router.push('/cursos/examen');
                })
        }

        return {
            dialogLoader,
            nameCourse,
            syllabusData,
            courseEvaluationData,
            onGenerateEvaluation
        }
    }
})
</script>