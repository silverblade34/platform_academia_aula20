<template>
    <div class="text-center">
        <v-btn class="text-none ms-4 text-white text-sm" color="blue-darken-1" rounded="2" @click="dialog = true">
            Crear nuevo
        </v-btn>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-toolbar color="blue">
                    <span class="px-4 w-full text-center">Crear nuevo alumno</span>
                </v-toolbar>
                <v-card-text>
                    <v-col cols="12">
                        <v-text-field label="Nombre" placeholder="Ingrese el nombre" :rules="[rules.required]"
                            v-model="name"></v-text-field>
                        <v-text-field label="Apellidos" placeholder="Ingrese apellidos" :rules="[rules.required]"
                            v-model="lastname"></v-text-field>
                    </v-col>
                    <v-col cols="12" class="flex gap-4">
                        <v-text-field label="DNI" placeholder="Ingrese el DNI" :rules="[rules.required]" v-model="codigo"
                            class="w-full"></v-text-field>
                        <v-select label="Genero" :items="['MASCULINO', 'FEMENINO']" class="w-full"
                            v-model="genero"></v-select>
                    </v-col>
                    <v-col cols="12" class="flex gap-4">
                        <v-select label="Sede" :items="listSelectCampus" v-model="campus" class="w-full"></v-select>
                        <v-select label="Universidad" :items="listSelectUniversities" class="w-full" v-model="university"></v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Correo" placeholder="Ingrese su correo" v-model="email"></v-text-field>
                        <v-text-field label="Usuario" placeholder="Ingrese un usuario" :rules="[rules.required]"
                            v-model="username" @input="checkUsernameAvailability" hide-details></v-text-field>
                        <span :class="statusValidateUser ? 'text-green' : 'text-red'" class="text-xs pl-3">{{
                            messageValidateUser }}</span>
                        <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                            label="Contraseña" hint="Al menos 8 carácteres" counter
                            @click:append="show1 = !show1"></v-text-field>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey-lighten-2" variant="tonal" @click="dialog = false">
                        Cancelar
                    </v-btn>
                    <v-btn color="blue-lighten-1" variant="tonal" @click="createStudent">
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
        listCampus: Array,
        listUniversities: Array
    },
    emits: ['create-student'],
    setup(props, { emit }) {
        const dialog = ref(false);
        const listSelectCampus = ref([]);
        const listSelectUniversities = ref([]);
        const show1 = ref(false);
        const show2 = ref(true);
        const name = ref('');
        const lastname = ref('');
        const codigo = ref('');
        const email = ref('');
        const campus = ref('');
        const university = ref('');
        const genero = ref('');
        const username = ref('');
        const password = ref('');
        const statusValidateUser = ref(false);
        const messageValidateUser = ref('');
        watch(() => props.listCampus, (newVal) => {
            listSelectCampus.value = newVal.map(campus => campus.name)
        })

        watch(() => props.listUniversities, (newVal) => {
            listSelectUniversities.value = newVal.map(university => university.initials)
        })

        const rules = {
            required: value => !!value || 'Obligatorio.',
            min: v => v.length >= 8 || 'Min 8 caracteres',
        }

        const createStudent = () => {
            emit('create-student', {
                name: name.value,
                lastname: lastname.value,
                codigo: codigo.value,
                email: email.value,
                campus: campus.value,
                university: university.value,
                genero: genero.value,
                username: username.value,
                password: password.value,
            })
            resetStudentData();
            dialog.value = false
        }

        const resetStudentData = () => {
            name.value = '';
            lastname.value = '';
            codigo.value = '';
            email.value = '';
            campus.value = '';
            genero.value = '';
            username.value = '';
            password.value = '';
            messageValidateUser.value = '';
            dialog.value = false;
        };

        const checkUsernameAvailability = () => {
            if (username.value != "") {
                checkUsernameAvailabilityApi(username.value)
                    .then(response => {
                        messageValidateUser.value = response.data.message;
                        statusValidateUser.value = response.data.status;
                    })
            }
        }

        return {
            dialog,
            name,
            lastname,
            codigo,
            email,
            campus,
            university,
            genero,
            username,
            password,
            rules,
            show1,
            show2,
            listSelectCampus,
            listSelectUniversities,
            messageValidateUser,
            statusValidateUser,
            checkUsernameAvailability,
            createStudent
        }
    }
}
</script>