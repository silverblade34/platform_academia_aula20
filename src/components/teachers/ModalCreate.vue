<template>
    <div class="text-center">
        <v-btn class="text-none ms-4 text-white text-sm" color="blue-darken-1" rounded="2" @click="dialog = true">
            Crear nuevo
        </v-btn>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-toolbar color="blue">
                    <span class="px-4 w-full text-center">Crear nuevo profesor</span>
                </v-toolbar>
                <v-card-text>
                    <v-col cols="12">
                        <v-text-field label="Nombre" placeholder="Ingrese el nombre" :rules="[rules.required]"
                            v-model="name"></v-text-field>
                        <v-text-field label="Apellidos" placeholder="Ingrese apellidos" :rules="[rules.required]"
                            v-model="lastname"></v-text-field>
                        <v-text-field label="DNI" placeholder="Ingrese el DNI" :rules="[rules.required]"
                            v-model="codigo"></v-text-field>
                        <v-text-field label="Correo" placeholder="Ingrese su correo" v-model="email"></v-text-field>
                        <v-text-field label="Usuario" placeholder="Ingrese un usuario" :rules="[rules.required]"
                            v-model="username"></v-text-field>
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
                    <v-btn color="blue-lighten-1" variant="tonal" @click="createTeacher">
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
    emits: ['create-teacher'],
    setup(_, { emit }) {
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

        const createTeacher = () => {
            emit('create-teacher', {
                name: name.value,
                lastname: lastname.value,
                codigo: codigo.value,
                email: email.value,
                username: username.value,
                password: password.value,
            })
            name.value = lastname.value = codigo.value = email.value = username.value = password.value = "";
            dialog.value = false
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
            createTeacher
        }
    }
}
</script>