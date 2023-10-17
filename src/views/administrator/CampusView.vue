<template>
    <div class="flex justify-between">
        <h1 class="font-bold text-xl text-gray-500 title-views">Sedes</h1>
        <ModalCreate @create-campus="createCampus" />
    </div>
    <div class="py-5">
        <TableCampus :desserts="listCampus" @delete-item="deleteItem" @edit-item="openEditItem" />
    </div>
    <ModalUpdate :openModal="openModalEdit" :objectCampus="objectCampusEdit" @close-modal="openModalEdit = false"
        @update-campus="updateCampus" />
</template>
<script>
import ModalCreate from "@/components/campus/ModalCreate.vue";
import ModalUpdate from "@/components/campus/ModalUpdate.vue";
import {
    finAllCampusApi, createCampusApi, finOneCampusApi,
    updateCampusApi, deleteCampusApi
} from '@/api/administrator/CampusService';
import { onMounted, ref } from "vue";
import TableCampus from "@/components/campus/TableCampus.vue";
import { basicAlert, confirmBasic } from "@/helpers/SweetAlert";

export default ({
    components: {
        ModalCreate,
        ModalUpdate,
        TableCampus
    },
    setup() {
        const listCampus = ref([]);
        const openModalEdit = ref(false);
        const objectCampusEdit = ref({});

        const loadData = async () => {
            await finAllCampusApi()
                .then(response => {
                    listCampus.value = response.data.data;
                })
        }

        onMounted(async () => {
            await loadData();
        })

        const createCampus = (data) => {
            if (data.name != "" && data.address != "") {
                createCampusApi(data)
                    .then(response => {
                        basicAlert(() => { }, 'success', 'Logrado', response.data.message)
                        loadData();
                    })
                    .catch(error => {
                        basicAlert(() => { }, 'error', 'Hubo un error al crear Sede', error.message)
                    })
            } else {
                basicAlert(() => { }, 'warning', 'Campos vacios', "Revise los campos obligatorios")
            }
        }

        const deleteItem = (data) => {
            confirmBasic(() => {
                deleteCampusApi(data.id)
                    .then(response => {
                        // Mostrar Sweet Alert eliminación exitosa
                        basicAlert(() => {
                            loadData();
                        }, 'success', 'Sede eliminada', response.data.message)
                    })
                    .catch(error => {
                        // Mostrar Sweet Alert de error al consumir el API
                        basicAlert(() => { }, 'error', 'Error', error.message)
                    });
            }, '¿Estás seguro de eliminar esta sede?', 'Eliminar');
        }

        const openEditItem = (data) => {
            finOneCampusApi(data.id)
                .then(response => {
                    objectCampusEdit.value = response.data.data;
                    openModalEdit.value = true;
                })
        }

        const updateCampus = (data) => {
            if (data.name != "" && data.address != "") {
                updateCampusApi(objectCampusEdit.value.id, data)
                    .then(response => {
                        basicAlert(() => { }, 'success', 'Logrado', response.data.message)
                        loadData();
                    })
                    .catch(error => {
                        basicAlert(() => { }, 'error', 'Hubo un error al actualizar el campus', error.message)
                    })
            } else {
                basicAlert(() => { }, 'warning', 'Campos vacios', "Revise los campos obligatorios")
            }
        }

        return {
            listCampus,
            objectCampusEdit,
            openModalEdit,
            deleteItem,
            openEditItem,
            createCampus,
            updateCampus
        }
    }
})
</script>