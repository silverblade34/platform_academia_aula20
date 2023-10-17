<template>
    <v-data-table :headers="headers" :items="desserts" class="elevation-1 text-sm">
        <template v-slot:[`item.actions`]="{ item }">
            <span>
                <v-icon @click="editItem(item)" color="green" class="mx-2">mdi-pencil</v-icon>
                <v-tooltip activator="parent" location="top">Editar</v-tooltip>
            </span>
            <span>
                <v-icon @click="deleteItem(item)" color="red" class="mx-2">mdi-delete</v-icon>
                <v-tooltip activator="parent" location="top">Eliminar</v-tooltip>
            </span>
        </template>
    </v-data-table>
</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable';
export default ({
    props: {
        desserts: Array
    },
    components: {
        VDataTable,
    },
    emits: ['delete-item', 'edit-item'],
    data() {
        return {
            headers: [
                {
                    title: 'Nombre',
                    align: 'start',
                    sortable: false,
                    key: 'name',
                },
                { title: 'Apellidos', align: 'start', key: 'lastName' },
                { title: 'DNI', align: 'start', key: 'codigo' },
                { title: 'Correo', align: 'start', key: 'email' },
                { title: 'Usuario', key: 'username' },
                { title: 'Fecha de creación', key: 'createdAt' },
                { title: 'Acciones', key: 'actions' },
            ]
        }
    },
    setup(_, { emit }) {

        const deleteItem = (item) => {
            emit('delete-item', {id: item.raw.idUser})
        }

        const editItem = (item) => {
            emit('edit-item', {id: item.raw.id})
        }

        return {
            deleteItem,
            editItem
        }
    }
})
</script>