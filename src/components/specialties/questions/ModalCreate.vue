<template>
    <div class="text-center">
        <v-btn class="text-none ms-4 text-white text-sm" color="blue-darken-1" rounded="2" @click="dialog = true">
            Nueva pregunta <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" width="700">
            <v-card>
                <v-toolbar color="blue">
                    <span class="px-4 w-full text-center">CREAR PREGUNTA</span>
                </v-toolbar>
                <v-card-text>
                    <v-col cols="12">
                        <v-textarea label="Descripción de la pregunta" variant="outlined" color="blue" class="smaller-text"
                            v-model="description" rows="7"></v-textarea>
                        <v-file-input label="Imagen pregunta (opcional)" color="blue"
                            v-model="imageQuestion"></v-file-input>
                        <v-textarea label="Descripción de la respuesta" variant="outlined" color="blue" class="smaller-text"
                            rows="2" v-model="descriptionAnswer"></v-textarea>
                        <v-file-input label="Imagen solucionario" color="blue" hide-details
                            v-model="imageAnswer"></v-file-input>
                        <div class="w-full flex justify-between items-center py-2">
                            <span class="text-center text-sm w-full py-3 text-blue rounded-md bg-blue-lighten-5">OPCIONES DE
                                RESPUESTA</span>
                        </div>
                        <v-radio-group v-model="correctAnswer">
                            <div class="grid grid-cols-2 gap-2">
                                <div class="flex items-center">
                                    <v-text-field label="Opción 1" color="blue" variant="outlined"
                                        prepend-inner-icon="mdi-text-short" density="compact" class="w-full" hide-details
                                        v-model="option1"></v-text-field>
                                    <v-radio value="option1" color="blue"></v-radio>
                                </div>
                                <div class="flex items-center">
                                    <v-text-field label="Opción 2" color="blue" variant="outlined"
                                        prepend-inner-icon="mdi-text-short" density="compact" class="w-full" hide-details
                                        v-model="option2"></v-text-field>
                                    <v-radio value="option2" color="blue"></v-radio>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-2 pt-3">
                                <div class="flex items-center">
                                    <v-text-field label="Opción 3" color="blue" variant="outlined"
                                        prepend-inner-icon="mdi-text-short" density="compact" class="w-full" hide-details
                                        v-model="option3"></v-text-field>
                                    <v-radio value="option3" color="blue"></v-radio>
                                </div>
                                <div class="flex items-center">
                                    <v-text-field label="Opción 4" color="blue" variant="outlined"
                                        prepend-inner-icon="mdi-text-short" density="compact" class="w-full" hide-details
                                        v-model="option4"></v-text-field>
                                    <v-radio value="option4" color="blue"></v-radio>
                                </div>
                            </div>
                        </v-radio-group>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey-lighten-2" variant="tonal" @click="dialog = false">
                        Cancelar
                    </v-btn>
                    <v-btn color="blue-lighten-1" variant="tonal" @click="createItem">
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { ref } from 'vue';

export default {
    emits: ['create-campus'],
    setup(_, { emit }) {
        const dialog = ref(false);
        const description = ref('');
        const imageQuestion = ref();
        const descriptionAnswer = ref();
        const imageAnswer = ref();
        const correctAnswer = ref('');
        const option1 = ref('');
        const option2 = ref('');
        const option3 = ref('');
        const option4 = ref('');

        const createItem = () => {
            emit('create-item', {
                description: description.value,
                imageQuestion: imageQuestion.value,
                imageAnswer: imageAnswer.value,
                descriptionAnswer: descriptionAnswer.value,
                optionsAnswer: [
                    {
                        description: option1.value,
                        status: correctAnswer.value == "option1" ? true : false
                    },
                    {
                        description: option2.value,
                        status: correctAnswer.value == "option2" ? true : false
                    },
                    {
                        description: option3.value,
                        status: correctAnswer.value == "option3" ? true : false
                    },
                    {
                        description: option4.value,
                        status: correctAnswer.value == "option4" ? true : false
                    }
                ]
            })

            dialog.value = false
        }

        return {
            dialog,
            description,
            imageQuestion,
            descriptionAnswer,
            imageAnswer,
            correctAnswer,
            option1,
            option2,
            option3,
            option4,
            createItem
        }
    }
}
</script>
<style>
.smaller-text textarea {
    font-size: 13.5px;
    /* Establece el tamaño de la fuente deseado */
}
</style>