<template>
    <section class="min-h-full w-full lg:pb-[2rem]">
        <div class="w-full flex justify-start items-center mb-3 text-sm text-gray-400 hover:text-gray-500 cursor-pointer">
            <router-link to='/especialidades'> <span> <v-btn icon="mdi mdi-chevron-left" variant="text"></v-btn>
                    Regresar</span> </router-link>
        </div>
        <div class="flex justify-between">
            <h1 class="font-bold text-xl text-gray-500 title-views">Temario: {{ syllabusQuestions.name }}</h1>
            <ModalCreate @create-item="onCreateItem" />
        </div>
        <div class="py-5">
            <TableQuestion :desserts="syllabusQuestions.questions" @delete-item="onDeleteItem" />
        </div>
    </section>
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
import { onMounted, ref } from 'vue';
import TableQuestion from '@/components/specialties/questions/TableQuestion.vue';
import {
    findAllQuestionSyllabusApi,
    createQuestionApi,
    createPossibleAnswers,
    deleteQuestionApi
} from '@/api/teacher/QuestionsService';
import { basicAlert, confirmBasic } from '@/helpers/SweetAlert';
import ModalCreate from '@/components/specialties/questions/ModalCreate.vue';

export default ({
    props: {
        id: String
    },
    components: {
        TableQuestion,
        ModalCreate
    },
    setup(props) {
        const syllabusQuestions = ref({});
        const dialogLoader = ref(false);

        onMounted(async () => {
            realoadData();
        })

        const realoadData = async () => {
            await findAllQuestionSyllabusApi(props.id)
                .then(response => {
                    syllabusQuestions.value = response.data.data
                })
                .catch(error => {
                    basicAlert(() => { }, 'error', 'Error', error.response.data.message)
                })
        }

        const onCreateItem = async (data) => {
            dialogLoader.value = true
            const formData = new FormData();
            formData.append('description', data.description);
            formData.append('descriptionAnswer', data.descriptionAnswer);
            formData.append('idSyllabus', props.id);

            if (data.imageQuestion) {
                const fileExtension = data.imageQuestion[0].name.split('.').pop(); // Obtener la extensión del archivo

                const newImageQuestion = new File([data.imageQuestion[0]], `question.${fileExtension}`, {
                    type: data.imageQuestion[0].type,
                });
                formData.append('images', newImageQuestion);
            }

            // Modificar nombre de imagen de respuesta (si existe)
            if (data.imageAnswer) {
                const fileExtension = data.imageAnswer[0].name.split('.').pop(); // Obtener la extensión del archivo

                const newImageAnswer = new File([data.imageAnswer[0]], `answer.${fileExtension}`, {
                    type: data.imageAnswer[0].type,
                });
                formData.append('images', newImageAnswer);
            }

            await createQuestionApi(formData)
                .then(response => {
                    const optionsAnswer = {
                        idQuestion: response.data.data.id,
                        optionsAnswer: data.optionsAnswer
                    }
                    createPossibleAnswers(optionsAnswer)
                        .then(() => {
                            dialogLoader.value = false
                            basicAlert(() => {
                                realoadData();
                            }, 'success', 'Logrado', "La pregunta se ha creado correctamente")
                        })
                })
                .catch(() => {
                    dialogLoader.value = false
                    basicAlert(() => { }, 'error', 'Error', "Ha sucedido un error al crear la pregunta")
                })
        }

        const onDeleteItem = (data) => {
            confirmBasic(() => {
                deleteQuestionApi(data.id)
                    .then(response => {
                        basicAlert(() => {
                            realoadData();
                        }, 'success', 'Logrado', response.data.message)
                    })
                    .catch(() => {
                        basicAlert(() => { }, 'error', 'Error', "Ha sucedido un error al eliminar la pregunta")
                    })
            }, '¿Estás seguro de eliminar esta pregunta?', 'Eliminar');
        }

        return {
            dialogLoader,
            syllabusQuestions,
            onCreateItem,
            onDeleteItem
        }
    }
})
</script>