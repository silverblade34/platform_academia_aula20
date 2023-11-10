<template>
    <div class="flex justify-between">
        <h1 class="font-bold text-xl text-gray-500 title-views">Profesores</h1>
        <ModalCreate @create-teacher="createTeacher" />
    </div>
    <div class="py-5">
        <TableTeachers :desserts="listTeachers" @delete-item="deleteItem" @edit-item="openEditItem" />
    </div>
    <ModalUpdate :openModal="openModalEdit" :objectTeacher="objectTeacherEdit" @close-modal="openModalEdit = false"
        @update-teacher="updateTeacher" />
</template>
<script>
import ModalCreate from "@/components/teachers/ModalCreate.vue";
import ModalUpdate from "@/components/teachers/ModalUpdate.vue";
import {
    findAllTeachersApi, createTeacherApi, findOneTeacherApi,
    updateTeacherApi
} from '@/api/administrator/TeachersService';
import { createUserApi, updateUserApi, deleteUserApi } from '@/api/administrator/UserService';
import { onMounted, ref } from "vue";
import TableTeachers from "../../components/teachers/TableTeachers.vue";
import { basicAlert, confirmBasic } from "@/helpers/SweetAlert";

export default ({
    components: {
        ModalCreate,
        ModalUpdate,
        TableTeachers
    },
    setup() {
        const listTeachers = ref([]);
        const openModalEdit = ref(false);
        const objectTeacherEdit = ref({});

        const loadData = async () => {
            await findAllTeachersApi()
                .then(response => {
                    listTeachers.value = response.data.data;
                })
        }

        onMounted(async () => {
            await loadData();
        })

        const createTeacher = (data) => {
            if (data.name != "" && data.lastname != "" && data.codigo != "" && data.email != "" && data.username != "" && data.password != "") {
                data.rol = "PROFESOR"
                createUserApi(data)
                    .then(() => {
                        createTeacherApi(data)
                            .then(response => {
                                basicAlert(() => {
                                    loadData();
                                }, 'success', 'Profesor creado', response.data.message)
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        // Mostrar Sweet Alert de error al consumir el API
                        basicAlert(() => { }, 'error', 'Error', error.response.data.message)
                    })
            } else {
                basicAlert(() => { }, 'warning', 'Campos vacios', "Revise los campos obligatorios")
            }
        }

        const deleteItem = (data) => {
            confirmBasic(() => {
                deleteUserApi(data.id)
                    .then(response => {
                        // Mostrar Sweet Alert eliminación exitosa
                        basicAlert(() => {
                            loadData();
                        }, 'success', 'Profesor eliminado', response.data.message)
                    })
                    .catch(error => {
                        // Mostrar Sweet Alert de error al consumir el API
                        basicAlert(() => { }, 'error', 'Error', error.response.data.message)
                    });
            }, '¿Estás seguro de eliminar a este profesor?', 'Eliminar');
        }

        const openEditItem = (data) => {
            findOneTeacherApi(data.id)
                .then(response => {
                    objectTeacherEdit.value = response.data.data;
                    openModalEdit.value = true;
                })
        }

        const updateTeacher = (data) => {
            if (data.name != "" && data.lastname != "" && data.username != "" && data.password != "") {
                updateUserApi(objectTeacherEdit.value.user.id, data)
                    .then(() => {
                        updateTeacherApi(objectTeacherEdit.value.id, data)
                            .then(response => {
                                basicAlert(() => { }, 'success', 'Logrado', response.data.message)
                                loadData();
                            })
                            .catch(error => {
                                basicAlert(() => { }, 'error', 'Hubo un error al actualizar el profesor', error.response.data.message)
                            })
                    })
                    .catch(error => {
                        basicAlert(() => { }, 'error', 'Hubo un error al actualizar el usuario', error.response.data.message)
                    })
            } else {
                basicAlert(() => { }, 'warning', 'Campos vacios', "Revise los campos obligatorios")
            }
        }

        return {
            listTeachers,
            objectTeacherEdit,
            openModalEdit,
            deleteItem,
            openEditItem,
            createTeacher,
            updateTeacher
        }
    }
})
</script>