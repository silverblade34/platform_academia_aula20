<template>
    <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="desserts" item-value="name"
        class="elevation-0 text-sm"></v-data-table>
</template>
<script>
/* eslint-disable */
import { VDataTable } from 'vuetify/labs/VDataTable';
export default ({
    components: {
        VDataTable,
    },
    data() {
        return {
            itemsPerPage: 10,
            headers: [
                { title: 'Nota', align: 'start', key: 'nota' },
                { title: 'Fecha', align: 'end', key: 'fecha' },
                { title: 'P. correctas', align: 'end', key: 'pcorrectas' },
                { title: 'P. incorrectas', align: 'end', key: 'pincorrectas' },
                { title: 'T. preguntas', align: 'end', key: 'total' },
            ],
            desserts: [
                {
                    "nota": 85,
                    "fecha": "2023-10-23",
                    "pcorrectas": 17,
                    "pincorrectas": 3,
                    "total": 20
                },
                {
                    "nota": 92,
                    "fecha": "2023-10-20",
                    "pcorrectas": 23,
                    "pincorrectas": 2,
                    "total": 25
                },
                {
                    "nota": 78,
                    "fecha": "2023-10-18",
                    "pcorrectas": 15,
                    "pincorrectas": 5,
                    "total": 20
                },
                {
                    "nota": 88,
                    "fecha": "2023-10-16",
                    "pcorrectas": 22,
                    "pincorrectas": 2,
                    "total": 24
                },
                {
                    "nota": 95,
                    "fecha": "2023-10-14",
                    "pcorrectas": 19,
                    "pincorrectas": 1,
                    "total": 20
                },
                {
                    "nota": 70,
                    "fecha": "2023-10-12",
                    "pcorrectas": 14,
                    "pincorrectas": 6,
                    "total": 20
                },
                {
                    "nota": 80,
                    "fecha": "2023-10-10",
                    "pcorrectas": 16,
                    "pincorrectas": 4,
                    "total": 20
                },
                {
                    "nota": 90,
                    "fecha": "2023-10-08",
                    "pcorrectas": 18,
                    "pincorrectas": 2,
                    "total": 20
                },
                {
                    "nota": 75,
                    "fecha": "2023-10-06",
                    "pcorrectas": 15,
                    "pincorrectas": 5,
                    "total": 20
                },
                {
                    "nota": 82,
                    "fecha": "2023-10-04",
                    "pcorrectas": 18,
                    "pincorrectas": 2,
                    "total": 20
                }
            ]

        }
    },
})
</script>