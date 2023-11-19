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
            <TableQuestion :desserts="syllabusQuestions.questions" />
        </div>
    </section>
</template>
<script>
import { onMounted, ref } from 'vue';
import TableQuestion from '@/components/specialties/questions/TableQuestion.vue';
import { findAllQuestionSyllabusApi, createQuestionApi } from '@/api/teacher/QuestionsService';
import { basicAlert } from '@/helpers/SweetAlert';
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
                    console.log(response.data)
                    realoadData();
                })
                .catch(error => {
                    console.log(error)
                })
        }

        return {
            syllabusQuestions,
            onCreateItem
        }
    }
})
</script>