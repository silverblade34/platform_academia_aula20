<template>
    <h1 class="font-bold text-xl text-gray-500 title-views">Examen</h1>
    <div class="py-5">
        <div class="lg:grid lg:grid-cols-8 block gap-5">
            <div class="col-span-2 w-full mb-5 lg:mb-0">
                <div class=" bg-white p-5 rounded-lg text-sm shadow">
                    <h2 class="font-bold text-lg text-teal-400 pb-3">Resumen de examen</h2>
                    <p class="my-2">Alumno: {{ studentName }}</p>
                    <p class="my-2">Curso: {{ courseName }} </p>
                    <p class="my-2">Hora inicio: {{ startTime }} </p>
                    <p class="my-2">Hora fin: {{ endTime }} </p>
                    <p class="my-2">Tiempo brindado: {{ timeGiven }}</p>
                </div>
            </div>
            <div class="col-span-6 w-full bg-white rounded-lg shadow">
                <h2 class="font-bold text-lg bg-teal-400 p-4 w-full text-white text-center rounded-t-lg">PREGUNTAS</h2>
                <div class="p-5">
                    <QuestionEvaluation v-for="(question, index) in questionsEvaluation" :key="question.id" :count="index"
                        :idQuestion="question.id" :question="question" @selected-answer="onSelectedAnswers" />
                    <div class="w-full flex justify-end gap-3">
                        <v-btn color="grey" variant="tonal">CANCELAR EXAMEN</v-btn>
                        <v-btn color="blue" variant="tonal" @click="onFinishExam">TERMINAR EXAMEN</v-btn>
                    </div>
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
/* eslint-disable */
import store from '@/store';
import { onMounted, ref } from 'vue';
import QuestionEvaluation from '@/components/courses/student/QuestionEvaluation.vue';
import { basicAlert, confirmBasic } from '@/helpers/SweetAlert';
import { createCourseEvaluationApi } from '@/api/student/CourseService';
import { useRouter } from 'vue-router';

export default {
    components: {
        QuestionEvaluation
    },
    setup() {
        const router = useRouter();
        const evaluationGenerate = ref({})
        const studentName = ref('');
        const courseName = ref('');
        const startTime = ref('');
        const endTime = ref('');
        const timeGiven = ref('');
        const questionsEvaluation = ref([]);
        const selectedAnswers = ref({});
        const startTimeEvaluation = ref('');
        const dialogLoader = ref(false);

        onMounted(() => {
            const now = new Date();
            evaluationGenerate.value = store.state.evaluationGenerate
            studentName.value = evaluationGenerate.value.student.name + " " + evaluationGenerate.value.student.lastName
            courseName.value = evaluationGenerate.value.course.name
            startTime.value = evaluationGenerate.value.startTime
            endTime.value = evaluationGenerate.value.endTime
            timeGiven.value = evaluationGenerate.value.timeGiven
            questionsEvaluation.value = evaluationGenerate.value.selectedQuestions
            questionsEvaluation.value.forEach((question) => {
                selectedAnswers.value[question.id] = { answerId: null, questionId: question.id, state: false, score: 0 };
            });
            startTimeEvaluation.value = now.toLocaleString('en-US', { timeZone: 'America/Guayaquil' });
        })

        const onFinishExam = () => {
            dialogLoader.value = true
            const courseQuestions = Object.keys(selectedAnswers.value).map((key) => {
                return selectedAnswers.value[key];
            });
            let error = false
            for (const courseQuestion of courseQuestions) {
                if (!courseQuestion.answerId) {
                    error = true
                }
            }
            if (!error) {
                // Filtrar elementos con state true
                const trueScores = courseQuestions.filter(item => item.state === true);

                // Filtrar elementos con state false
                const falseScores = courseQuestions.filter(item => item.state === false);

                // Sumar los scores para state true y state false
                const sumScores = courseQuestions.reduce((total, item) => total + item.score, 0);
                const data = {
                    correctQuestions: trueScores.length,
                    wrongQuestions: falseScores.length,
                    score: sumScores,
                    studentId: evaluationGenerate.value.student.id,
                    courseId: evaluationGenerate.value.course.id,
                    startTime: startTimeEvaluation.value,
                    timeGiven: timeGiven.value,
                    courseQuestions: courseQuestions
                }
                createCourseEvaluationApi(data)
                    .then(response => {
                        dialogLoader.value = false
                        basicAlert(() => {
                            // Suponiendo que `response.data.id` contiene el ID que quieres enviar a la ruta 'resultado/curso/examen'
                            router.push({ name: 'resultado/curso/examen', params: { id: response.data.data.id } });
                            store.commit('setEvaluationGenerate', {});
                        }, 'success', 'Logrado', response.data.message)
                    })
                    .catch(error => {
                        basicAlert(() => { }, 'error', 'Error!!', error.response.data.message)
                    })

            } else {
                dialogLoader.value = false
                basicAlert(() => { }, 'warning', 'Alerta!!', 'Asegurate de responder todas las preguntas')
            }
        }

        const onSelectedAnswers = (data) => {
            const question = questionsEvaluation.value.find(question => question.id == data.questionId)
            const state = question.possibleAnswers.find(possibleAnswer => possibleAnswer.id == data.answerId).status
            selectedAnswers.value[data.questionId].answerId = data.answerId;
            selectedAnswers.value[data.questionId].state = state
            selectedAnswers.value[data.questionId].score = state ? evaluationGenerate.value.scorePerQuestion : 0
        };

        return {
            onFinishExam,
            onSelectedAnswers,
            questionsEvaluation,
            evaluationGenerate,
            selectedAnswers,
            studentName,
            dialogLoader,
            courseName,
            startTime,
            endTime,
            timeGiven
        }
    }
}

</script>