<template>
    <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="desserts" item-value="name"
        class="elevation-0 text-sm"></v-data-table>
</template>
<script>
/* eslint-disable */
import { VDataTable } from 'vuetify/labs/VDataTable';
export default ({
    props: {
        desserts: Array
    },
    components: {
        VDataTable,
    },
    data() {
        return {
            itemsPerPage: 10,
            headers: [
                { title: 'Hora inicio', align: 'start', key: 'startTime' },
                { title: 'Hora Fin', align: 'start', key: 'createdAtParsed' },
                { title: 'P. correctas', align: 'start', key: 'correctQuestions' },
                { title: 'P. incorrectas', align: 'start', key: 'wrongQuestions' },
                { title: 'Nota', align: 'start', key: 'score' },
            ],
        }
    },
})
</script>