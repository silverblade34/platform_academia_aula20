<template>
    <div class="flex justify-between">
        <h1 class="font-bold text-xl text-gray-500 title-views">Universidades</h1>
        <ModalCreate @create-university="createUniversities" />
    </div>
    <div class="py-5">
        <TableUniversities :desserts="listUniversities" @delete-item="deleteItem" @edit-item="openEditItem" />
    </div>
    <ModalUpdate :openModal="openModalEdit" :objectUniversity="objectUniversityEdit" @close-modal="openModalEdit = false"
        @update-university="updateUniversity" />
</template>
<script>
import ModalCreate from "@/components/universities/ModalCreate.vue";
import ModalUpdate from "@/components/universities/ModalUpdate.vue";
import {
    finAllUniversitiesApi, createUniversitiesApi, deleteUniversitiesApi,
    finOneUniversitiesApi, updateUniversitiesApi
} from '@/api/administrator/UniversitiesService';
import { onMounted, ref } from "vue";
import TableUniversities from "@/components/universities/TableUniversities.vue";
import { basicAlert, confirmBasic } from "@/helpers/SweetAlert";


export default ({
    components: {
        ModalCreate,
        ModalUpdate,
        TableUniversities
    },
    setup() {
        const listUniversities = ref([]);
        const openModalEdit = ref(false);
        const objectUniversityEdit = ref({});

        const loadData = async () => {
            await finAllUniversitiesApi()
                .then(response => {
                    listUniversities.value = response.data.data;
                })
        }

        onMounted(async () => {
            await loadData();
        })

        const createUniversities = (data) => {
            if (data.name != "" && data.initials != "") {
                createUniversitiesApi(data)
                    .then(response => {
                        basicAlert(() => { }, 'success', 'Logrado', response.data.message)
                        loadData();
                    })
                    .catch(error => {
                        basicAlert(() => { }, 'error', 'Hubo un error al crear la universidad', error.response.data.message)
                    })
            } else {
                basicAlert(() => { }, 'warning', 'Campos vacios', "Revise los campos obligatorios")
            }
        }

        const deleteItem = (data) => {
            confirmBasic(() => {
                deleteUniversitiesApi(data.id)
                    .then(response => {
                        // Mostrar Sweet Alert eliminación exitosa
                        basicAlert(() => {
                            loadData();
                        }, 'success', 'Universidad eliminada', response.data.message)
                    })
                    .catch(error => {
                        // Mostrar Sweet Alert de error al consumir el API
                        basicAlert(() => { }, 'error', 'Error', error.response.data.message)
                    });
            }, '¿Estás seguro de eliminar esta universidad?', 'Eliminar');
        }

        const openEditItem = (data) => {
            finOneUniversitiesApi(data.id)
                .then(response => {
                    objectUniversityEdit.value = response.data.data;
                    openModalEdit.value = true;
                })
        }

        const updateUniversity = (data) => {
            if (data.name != "" && data.initials != "") {
                updateUniversitiesApi(objectUniversityEdit.value.id, data)
                    .then(response => {
                        basicAlert(() => { }, 'success', 'Logrado', response.data.message)
                        loadData();
                    })
                    .catch(error => {
                        basicAlert(() => { }, 'error', 'Hubo un error al actualizar la universidad', error.response.data.message)
                    })
            } else {
                basicAlert(() => { }, 'warning', 'Campos vacios', "Revise los campos obligatorios")
            }
        }

        return {
            listUniversities,
            openModalEdit,
            objectUniversityEdit,
            createUniversities,
            updateUniversity,
            deleteItem,
            openEditItem
        }
    }
})
</script>