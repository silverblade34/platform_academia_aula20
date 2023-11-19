<template>
  <v-data-table :headers="headers" :items="desserts" class="elevation-1 text-sm">
    <template v-slot:[`item.description`]="{ item }">
      <span>{{ truncateDescription(item) }}</span>
    </template>
    <template v-slot:[`item.imageQuestion`]="{ item }">
      <v-btn color="green" size="small" @click="viewImage(item.raw.imageQuestion)"> <v-icon>mdi-image</v-icon> </v-btn>
    </template>
    <template v-slot:[`item.imageAnswer`]="{ item }">
      <v-btn color="green" size="small" @click="viewImage(item.raw.imageAnswer)"> <v-icon>mdi-image</v-icon> </v-btn>
    </template>
    <template v-slot:[`item.optionsAnswer`]="{ item }">
      <v-btn color="blue" size="small" @click="viewOptionsAnswer(item.raw.id)"> <v-icon>mdi-animation</v-icon> </v-btn>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div class="flex w-full justify-center">
        <span>
          <v-icon @click="editItem(item)" color="green" class="mx-2">mdi-pencil</v-icon>
          <v-tooltip activator="parent" location="top">Editar</v-tooltip>
        </span>
        <span>
          <v-icon @click="deleteItem(item)" color="red" class="mx-2">mdi-delete</v-icon>
          <v-tooltip activator="parent" location="top">Eliminar</v-tooltip>
        </span>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import { ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { findAllPossibleAnswersQuestionApi } from '@/api/teacher/QuestionsService';
import Swal from 'sweetalert2';

export default ({
  props: {
    desserts: Array
  },
  components: {
    VDataTable,
  },
  methods: {
    truncateDescription(item) {
      if (item.raw.description.length > 200) {
        return item.raw.description.substring(0, 200) + '...';
      }
      return item.raw.description;
    }
  },
  setup() {
    const baseURL = process.env.VUE_APP_BASE_URL;
    const headers = ref([
      {
        title: 'Descripción',
        align: 'start',
        sortable: false,
        key: 'description',
      },
      { title: 'Img. descripción', key: 'imageQuestion' },
      { title: 'Descripción solucionario', key: 'descriptionAnswer' },
      { title: 'Img. solucionario', key: 'imageAnswer' },
      { title: 'Opciones de respuesta', key: 'optionsAnswer' },
      { title: 'Actions', key: 'actions', align: 'center' },
    ])

    const editItem = (item) => {
      console.log(item.columns)
    }
    const deleteItem = (item) => {
      console.log(item.columns)
    }

    const viewImage = (pathImage) => {
      if (!pathImage) {
        Swal.fire({
          text: 'No hay una imagen cargada',
          showCloseButton: true,
          confirmButtonColor: '#3b82f6',
        });
        return; // Sale de la función si no hay una imagen cargada
      }

      const imageUrl = `${baseURL}/questions/getImage/${pathImage}`;

      Swal.fire({
        imageUrl: imageUrl,
        imageAlt: 'Imagen',
        showCloseButton: true,
        confirmButtonColor: '#3b82f6',
      });
    };

    const viewOptionsAnswer = (id) => {
      findAllPossibleAnswersQuestionApi(id)
        .then(response => {
          console.log(response.data.data)
          let htmlContent = '<p class="pb-5">Lista de opciones de respuesta</p>';

          response.data.data.forEach(option => {
            const color = option.status ? '#2DE500' : '#959595';
            htmlContent += `
          <div class="rounded-lg p-3 mb-2 ${color} text-white" style="background-color: ${color}"">
            ${option.description}
          </div>
        `;
          });

          Swal.fire({
            html: htmlContent,
            confirmButtonColor: '#3b82f6',
          });
        })
        .catch(error => {
          console.log(error.response.data)
        })
    }


    return {
      headers,
      viewOptionsAnswer,
      viewImage,
      editItem,
      deleteItem
    }
  }
})
</script>