<template>
    <div class="flex justify-end w-full">
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </div>
    <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="desserts" item-value="name"
        class="elevation-1" :search="search" show-select @update:selected="updateSelected">
        <template #item="{ item }">
            <tr>
                <td>
                    <input type="checkbox" :value="item.name" v-model="isSelected">
                </td>
                <td class="text-blue-500">{{ item.raw.name }}</td>
                <td>{{ item.raw.calories }}</td>
                <td>{{ item.raw.fat }}</td>
                <td>{{ item.raw.carbs }}</td>
                <td>{{ item.raw.protein }}</td>
                <td><i :class="item.raw.iron + ' fa-lg'"></i></td>
                <td>
                    <a href="#" class="tooltip font-medium text-green-400 w-8 h-8 
                    flex items-center justify-center rounded-lg
                    bg-gray-100 hover:text-green-600" @click.prevent="editDessert(item.name)">
                        <i class="fa-solid fa-pen-to-square"></i>
                        <span class="tooltiptext">Editar</span>
                    </a>
                    <a href="#" class="tooltip font-medium text-red-400 w-8 h-8
                    flex items-center justify-center rounded-lg
                    bg-gray-100 hover:text-red-600" @click.prevent="deleteDessert(item.name)">
                        <i class="fa-solid fa-trash"></i>
                        <span class="tooltiptext">Eliminar</span>
                    </a>
                </td>
            </tr>
        </template>
    </v-data-table>
</template>
  
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'

export default {
    components: {
        VDataTable
    },
    data() {
        return {
            page: 1,
            search: '',
            itemsPerPage: 5,
            isSelected: false,
            selectedItems: [],
            headers: [
                {
                    align: 'start',
                    key: 'name',
                    sortable: false,
                    title: 'Dessert (100g serving)',
                },
                { title: 'Calories', key: 'calories' },
                { title: 'Fat (g)', key: 'fat' },
                { title: 'Carbs (g)', key: 'carbs' },
                { title: 'Protein (g)', key: 'protein' },
                { title: 'Iron (%)', key: 'iron' },
                { title: 'Acciones', key: 'acciones' }
            ],
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 'hgfhfgh',
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: 'fa-solid fa-user-doctor',
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: 1,
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: 7,
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: 8,
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: 16,
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: 0,
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: 2,
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: 45,
                },
                {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: 22,
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: 6,
                },
            ],
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.desserts.length / this.itemsPerPage)
        },
    },
    methods: {
        editDessert(name) {
            // Emitir evento para editar, pasando el nombre como parámetro
            this.$emit('edit-dessert', name);
        },
        deleteDessert(name) {
            // Emitir evento para eliminar, pasando el nombre como parámetro
            this.$emit('delete-dessert', name);
        },
        updateSelected(selectedItems) {
            console.log("---------SELECCIONAR TODOS---------------")
            this.selectedItems = selectedItems;
            this.isSelected = true;
        },
    }
}
</script>
<style>
.custom-header-class {
    background-color: blueviolet;
    /* Cambia por el color que desees */
    color: white;
    /* Cambia el color del texto si es necesario */
}
</style>