<template>
    <div class="text-center">
        <v-btn class="text-none ms-4 text-white text-sm" color="blue-darken-1" rounded="2" @click="dialog = true">
            Crear nuevo
        </v-btn>
        <v-dialog v-model="dialog" width="800" @click:outside="closeModal">
            <v-card>
                <v-toolbar color="blue">
                    <span class="px-4 w-full text-center">CREAR CURSO</span>
                </v-toolbar>
                <v-card-text>
                    <v-col cols="12">
                        <v-text-field label="Nombre" v-model="name" color="blue" variant="outlined"
                            prepend-inner-icon="mdi-text-box" hide-details></v-text-field>
                        <div class="w-full flex justify-between items-center py-3">
                            <span class="text-center text-sm w-full py-3 text-blue rounded-md bg-blue-lighten-5">TEMARIOS</span>
                        </div>
                        <div class="grid grid-cols-5 gap-2">
                            <div class="col-span-2 text-sm">
                                <v-text-field label="Nombre del tema" color="blue" v-model="namesubject" variant="outlined"
                                    prepend-inner-icon="mdi-format-text" density="compact"></v-text-field>
                                <v-textarea label="Descripción del tema" color="blue" v-model="descriptionsubject"
                                    variant="outlined" prepend-inner-icon="mdi-text-box-edit"
                                    placeholder="Separa los items por un '-', ejemplo: -Item 1 - Item 2" rows="8"
                                    auto-grow></v-textarea>
                                <div class="flex justify-center gap-1">
                                    <v-btn color="cyan-lighten-3" class="w-full text-white" @click="createSubject" variant="tonal" append-icon="mdi-plus">
                                        Agregar temario
                                    </v-btn>
                                </div>
                            </div>
                            <div class="col-span-3 border-solid border border-gray-800 rounded-md p-3">
                                <p class="text-gray-400 text-sm pb-1 text-center">LISTA DE TEMARIOS CREADOS</p>
                                <div class="container_subject">
                                    <v-expansion-panels variant="accordion">
                                        <v-expansion-panel v-for="subject in listSubject" :key="subject.name">
                                            <v-expansion-panel-title>
                                                <div class="w-full flex justify-between items-center">
                                                    <span>{{ subject.name }}</span>
                                                    <span @click="removeSubject(subject)">
                                                        <v-btn color="red" class="mx-2" icon="mdi-delete" size="small"
                                                            density="compact" variant="text"></v-btn>
                                                        <v-tooltip activator="parent" location="top">Quitar</v-tooltip>
                                                    </span>
                                                </div>
                                            </v-expansion-panel-title>
                                            <v-expansion-panel-text>
                                                <div class="w-full text-xs">
                                                    {{ subject.description }}
                                                </div>
                                            </v-expansion-panel-text>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </div>
                            </div>
                        </div>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey-lighten-2" variant="tonal" @click="closeModal">
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
import { ref } from 'vue'
export default {
    emits: ['create-course'],
    setup(_, { emit }) {
        const dialog = ref(false);
        const name = ref('');
        const listSubject = ref([]);
        const namesubject = ref('');
        const descriptionsubject = ref('');

        const createItem = () => {
            emit('create-course', {
                name: name.value,
                syllabus: listSubject.value
            })
            name.value = namesubject.value = descriptionsubject.value = ""
            listSubject.value = []
            dialog.value = false
        }

        const createSubject = () => {
            const subject = {
                name: namesubject.value,
                description: descriptionsubject.value
            }
            listSubject.value.push(subject);
            namesubject.value = ''
            descriptionsubject.value = ''
        }

        const removeSubject = (subjectToRemove) => {
            listSubject.value = listSubject.value.filter(subject => subject !== subjectToRemove)
        }

        const closeModal = () => {
            name.value = namesubject.value = descriptionsubject.value = ""
            listSubject.value = []
            dialog.value = false
        }

        return {
            dialog,
            name,
            listSubject,
            namesubject,
            descriptionsubject,
            removeSubject,
            createSubject,
            createItem,
            closeModal
        }
    }
}
</script>
<style>
.container_subject {
    padding: 15px 10px;
    min-height: 280px;
    max-height: 300px;
    overflow-y: scroll;
}
</style>