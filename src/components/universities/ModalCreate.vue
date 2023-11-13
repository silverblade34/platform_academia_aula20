<template>
    <div class="text-center">
        <v-btn class="text-none ms-4 text-white text-sm" color="blue-darken-1" rounded="2" @click="dialog = true">
            Crear nuevo
        </v-btn>
        <v-dialog v-model="dialog" width="600">
            <v-card>
                <v-toolbar color="blue">
                    <span class="px-4 w-full text-center">CREAR UNIVERSIDAD</span>
                </v-toolbar>
                <v-card-text>
                    <v-col cols="12">
                        <v-text-field label="Nombre" type="text" v-model="name" color="blue" required variant="outlined"
                            prepend-inner-icon="mdi-text-box"></v-text-field>
                        <v-text-field label="Sigla" type="text" v-model="initials" color="blue" required variant="outlined"
                            prepend-inner-icon="mdi-signature-text"></v-text-field>
                        <v-autocomplete :items="listCourse.map(course => course.name)" v-model="addCourse"
                            label="Agregar cursos" variant="outlined" prepend-inner-icon="mdi-plus-box">
                        </v-autocomplete>
                        <v-table class="text-sm">
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        #
                                    </th>
                                    <th class="text-left w-full">
                                        Curso
                                    </th>
                                    <th class="text-center">
                                        Preguntas
                                    </th>
                                    <th class="text-center">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in listedCourse" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td class="text-center">
                                        <v-text-field type="number" v-model="item.examQuestions" density="compact"
                                            hide-details class="w-full" variant="underlined" color="blue"></v-text-field>
                                    </td>
                                    <td class="text-center">
                                        <span @click="removeCourse(index)">
                                            <v-btn icon="mdi-delete-empty" size="small" variant="text" color="red"></v-btn>
                                            <v-tooltip activator="parent" location="top">Quitar</v-tooltip>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey-lighten-2" variant="tonal" @click="dialog = false">
                        Cancelar
                    </v-btn>
                    <v-btn color="blue-lighten-1" variant="tonal" @click="createUniversity">
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { ref, watch } from 'vue';

export default {
    props: {
        listCourse: Array,
    },
    emits: ['create-university'],
    setup(props, { emit }) {
        const dialog = ref(false);
        const name = ref('');
        const initials = ref('');
        const listedCourse = ref([]);
        const addCourse = ref('');
        const listCourses = ref([]);

        const createUniversity = () => {
            emit('create-university', {
                name: name.value,
                initials: initials.value,
                universityCourses: listedCourse.value
            })
            name.value = "";
            initials.value = "";
            listedCourse.value = [];
            dialog.value = false
        }

        watch(() => dialog.value, (newVal) => {
            if (newVal) {
                listCourses.value = props.listCourse
            }
        })

        watch(() => addCourse.value, (newVal) => {
            if (newVal) {
                const course = {
                    idcourse: listCourses.value.find(course => course.name == newVal).id,
                    name: newVal,
                    examQuestions: 0,
                }
                const existsCourse = listedCourse.value.find(course => newVal == course.name)
                !existsCourse ? listedCourse.value.push(course) : console.log("Ya existe este curso");
                addCourse.value = "";
            }
        })

        const removeCourse = (index) => {
            listedCourse.value.splice(index, 1); // Elimina el producto del arreglo
        };

        return {
            dialog,
            name,
            initials,
            addCourse,
            listedCourse,
            removeCourse,
            createUniversity
        }
    }
}
</script>