<template>
    <div class="text-center">
        <v-btn class="text-none ms-4 text-white text-sm" color="blue-darken-1" rounded="2" @click="dialog = true">
            Crear nuevo
        </v-btn>
        <v-dialog v-model="dialog" width="500" @click:outside="closeModal">
            <v-card>
                <v-toolbar color="blue">
                    <span class="px-4 w-full text-center">CREAR PROFESOR</span>
                </v-toolbar>
                <v-card-text>
                    <v-col cols="12">
                        <v-text-field label="Nombre" placeholder="Ingrese el nombre" :rules="[rules.required]"
                            v-model="name" color="blue" variant="outlined" prepend-inner-icon="mdi-text-box"></v-text-field>
                        <v-text-field color="blue" label="Apellidos" placeholder="Ingrese apellidos"
                            :rules="[rules.required]" v-model="lastname" variant="outlined"
                            prepend-inner-icon="mdi-text-account"></v-text-field>
                        <v-text-field color="blue" label="DNI" placeholder="Ingrese el DNI" :rules="[rules.required]"
                            v-model="codigo" class="w-full" variant="outlined"
                            prepend-inner-icon="mdi-barcode"></v-text-field>
                        <v-text-field color="blue" variant="outlined" prepend-inner-icon="mdi-email" label="Correo"
                            placeholder="Ingrese su correo" v-model="email"></v-text-field>
                        <v-text-field color="blue" variant="outlined" prepend-inner-icon="mdi-account" label="Usuario"
                            placeholder="Ingrese un usuario" :rules="[rules.required]" v-model="username"
                            @input="checkUsernameAvailability" hide-details></v-text-field>
                        <span :class="statusValidateUser ? 'text-green' : 'text-red'" class="text-xs pl-3 pb-3">{{
                            messageValidateUser }}</span>
                        <v-text-field color="blue" variant="outlined" prepend-inner-icon="mdi-lock" v-model="password"
                            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]" :type="showPassword ? 'text' : 'password'"
                            name="input-10-1" label="Contraseña" hint="Al menos 8 carácteres" counter
                            @click:append-inner="showPassword = !showPassword" class="pb-3"></v-text-field>

                        <v-autocomplete :items="listCourse.map(course => course.name)" v-model="addCourse" color="blue"
                            label="Asignar especialidad" variant="outlined" prepend-inner-icon="mdi-plus-box">
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
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in listedCourse" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.name }}</td>
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
                    <v-btn color="blue-grey-lighten-2" variant="tonal" @click="closeModal">
                        Cancelar
                    </v-btn>
                    <v-btn color="blue-lighten-1" variant="tonal" @click="createTeacher">
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { checkUsernameAvailabilityApi } from '@/api/administrator/UserService';
import { ref, watch } from 'vue'
export default {
    props: {
        listCourse: Array,
    },
    emits: ['create-teacher'],
    setup(props, { emit }) {
        const dialog = ref(false);
        const showPassword = ref(false);
        const name = ref('');
        const lastname = ref('');
        const codigo = ref('');
        const email = ref('');
        const username = ref('');
        const password = ref('');
        const statusValidateUser = ref(false);
        const messageValidateUser = ref('');
        const addCourse = ref('');
        const listedCourse = ref([]);
        const listCoursesData = ref([]);

        const rules = {
            required: value => !!value || 'Obligatorio.',
            min: v => v.length >= 8 || 'Min 8 caracteres',
        }

        watch(() => dialog.value, (newVal) => {
            if (newVal) {
                listCoursesData.value = props.listCourse
            }
        })

        const createTeacher = () => {
            emit('create-teacher', {
                name: name.value,
                lastName: lastname.value,
                codigo: codigo.value,
                email: email.value,
                username: username.value,
                password: password.value,
                rol: "PROFESOR",
                courses: listedCourse.value.map(course => course.idcourse)
            })
            name.value = lastname.value = codigo.value = email.value = username.value = password.value = addCourse.value = "";
            dialog.value = statusValidateUser.value = showPassword.value = false;
            listedCourse.value = []
        }

        const checkUsernameAvailability = () => {
            if (username.value != "") {
                checkUsernameAvailabilityApi(username.value)
                    .then(response => {
                        messageValidateUser.value = response.data.message;
                        statusValidateUser.value = response.data.status;
                    })
            }
        }

        const closeModal = () => {
            name.value = lastname.value = codigo.value = email.value = username.value = password.value = addCourse.value = "";
            dialog.value = statusValidateUser.value = showPassword.value = false
            listedCourse.value = []
        }

        watch(() => addCourse.value, (newVal) => {
            if (newVal) {
                const course = {
                    idcourse: listCoursesData.value.find(course => course.name == newVal).id,
                    name: newVal
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
            lastname,
            codigo,
            email,
            username,
            password,
            rules,
            showPassword,
            statusValidateUser,
            messageValidateUser,
            listedCourse,
            addCourse,
            checkUsernameAvailability,
            removeCourse,
            createTeacher,
            closeModal
        }
    }
}
</script>