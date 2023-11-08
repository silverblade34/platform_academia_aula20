<template>
  <v-data-table :headers="headers" :items="desserts" class="elevation-1 text-sm">
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon @click="editItem(item)" color="green">mdi-pencil</v-icon>
      <v-icon @click="deleteItem(item)" color="red">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>

import { VDataTable } from 'vuetify/labs/VDataTable'
export default ({
  components: {
    VDataTable,
  },
  data() {
    return {
      headers: [
        {
          title: 'Pregunta',
          align: 'start',
          sortable: false,
          key: 'pregunta',
        },
        { title: 'Opción 1', key: 'opcion1' },
        { title: 'Opción 2', key: 'opcion2' },
        { title: 'Opción 3', key: 'opcion3' },
        { title: 'Opción 4', key: 'opcion4' },
        { title: 'Solución', key: 'solucion' },
        { title: 'Actions', key: 'actions' }, // Columna adicional para acciones
      ],
      desserts: [
        {
          "pregunta": "¿Cuál es el área de un triángulo con una base de 6 metros y una altura de 8 metros?",
          "opcion1": "24 metros cuadrados",
          "opcion2": "36 metros cuadrados",
          "opcion3": "48 metros cuadrados",
          "opcion4": "64 metros cuadrados",
          "solucion": "opcion2"
        },
        {
          "pregunta": "¿Cuál es la fórmula para calcular el área de un círculo?",
          "opcion1": "A = πr^2",
          "opcion2": "A = 2πr",
          "opcion3": "A = 0.5πr",
          "opcion4": "A = 3.14r",
          "solucion": "opcion1"
        },
        {
          "pregunta": "¿Cuál de las siguientes figuras geométricas tiene 8 lados?",
          "opcion1": "Hexágono",
          "opcion2": "Octágono",
          "opcion3": "Decágono",
          "opcion4": "Pentágono",
          "solucion": "opcion2"
        },
        {
          "pregunta": "¿Cuál es la suma de los ángulos internos de un triángulo?",
          "opcion1": "90 grados",
          "opcion2": "180 grados",
          "opcion3": "270 grados",
          "opcion4": "360 grados",
          "solucion": "opcion2"
        },
        {
          "pregunta": "¿Cuál es el volumen de un cubo con un lado de 5 centímetros?",
          "opcion1": "100 cm³",
          "opcion2": "125 cm³",
          "opcion3": "150 cm³",
          "opcion4": "175 cm³",
          "solucion": "opcion1"
        }
      ]
    }
  },
  setup() {
    const editItem = (item) => {
      console.log("--EDITAR--")
      console.log(item.columns)
    }
    const deleteItem = (item) => {
      console.log("--ELIMINAR--")
      console.log(item.columns)
    }
    return {
      editItem,
      deleteItem
    }
  }
})
</script>