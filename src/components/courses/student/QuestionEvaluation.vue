<template>
    <p class="pb-3 text-blue-400 font-extrabold title-views">PREGUNTA {{ count + 1 }}</p>
    <span class="w-full pt-5">
        {{ question.description }}
    </span>
    <div class="w-full flex justify-center items-center pt-4">
        <img :src="'http://localhost:3000/api/v1/questions/getImage/' + question.imageQuestion" alt=""
            class="max-w-[300px]">
    </div>
    <v-radio-group v-model="selectedAnswer">
        <div class="grid grid-cols-4 gap-4 pt-5">
            <div v-for="answers in question.possibleAnswers" :key="answers.id">
                <v-radio :label="answers.description" :value="answers.id" color="blue"></v-radio>
            </div>
        </div>
    </v-radio-group>
</template>
<script>
import { ref, watch } from 'vue';

export default {
    props: {
        idQuestion: String,
        count: String,
        question: Object,
    },
    emits: ['selected-answer'],
    setup(props, { emit }) {
        const selectedAnswer = ref(null); // Inicializa con el valor que desees

        watch(() => selectedAnswer.value, (newVal) => {
            emit('selected-answer', {
                questionId: props.idQuestion,
                answerId: newVal
            })
        })

        return {
            selectedAnswer,
        };
    },
};
</script>