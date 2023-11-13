<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500" @click:outside="closeModal">
            <v-card>
                <v-toolbar color="blue">
                    <span class="px-4 w-full text-center">EDITAR PROFESOR</span>
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
                            placeholder="Ingrese un usuario" :rules="[rules.required]" v-model="username"></v-text-field>
                        <v-text-field color="blue" variant="outlined" prepend-inner-icon="mdi-lock" v-model="password"
                            :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'" name="input-10-1" label="Contraseña"
                            hint="Al menos 8 carácteres" counter @click:append-inner="show1 = !show1"></v-text-field>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey-lighten-2" variant="tonal" @click="closeModal">
                        Cancelar
                    </v-btn>
                    <v-btn color="blue-lighten-1" variant="tonal" @click="updateTeacher">
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { ref, watch } from 'vue'
export default {
    props: {
        objectTeacher: Object,
        openModal: Boolean
    },
    emits: ['update-teacher'],
    setup(props, { emit }) {
        const dialog = ref(false);
        const show1 = ref(false);
        const show2 = ref(true);
        const name = ref('');
        const lastname = ref('');
        const codigo = ref('');
        const email = ref('');
        const username = ref('');
        const password = ref('');
        const rules = {
            required: value => !!value || 'Obligatorio.',
            min: v => v.length >= 8 || 'Min 8 caracteres',
        }

        watch(() => props.openModal, (newVal) => {
            dialog.value = newVal;
            name.value = props.objectTeacher.name;
            lastname.value = props.objectTeacher.lastName;
            codigo.value = props.objectTeacher.codigo;
            email.value = props.objectTeacher.email;
            username.value = props.objectTeacher.user.username;
            password.value = props.objectTeacher.user.password;
        });

        const updateTeacher = () => {
            emit('update-teacher', {
                name: name.value,
                lastname: lastname.value,
                codigo: codigo.value,
                email: email.value,
                username: username.value,
                password: password.value,
            })
            name.value = lastname.value = codigo.value = email.value = username.value = password.value = "";
            closeModal();
        }

        const closeModal = () => {
            emit('close-modal')
        }
        return {
            dialog,
            name,
            lastname,
            codigo,
            email,
            username,
            password,
            rules,
            show1,
            show2,
            closeModal,
            updateTeacher
        }
    }
}
</script>