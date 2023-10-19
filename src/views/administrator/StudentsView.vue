<template>
    <div class="flex justify-between">
        <h1 class="font-bold text-xl text-gray-500 title-views">Alumnos</h1>
        <ModalCreate @create-student="createStudent" :listCampus="listCampus" :listUniversities="listUniversities"/>
    </div>
    <div class="py-5">
        <TableStudents :desserts="listStudents" @delete-item="deleteItem" @edit-item="openEditItem" />
    </div>
    <ModalUpdate :openModal="openModalEdit" :objectTeacher="objectTeacherEdit" @close-modal="openModalEdit = false"
        @update-teacher="updateTeacher" />
</template>
<script>
import ModalCreate from "@/components/students/ModalCreate.vue";
import ModalUpdate from "@/components/teachers/ModalUpdate.vue";
import {
    /* eslint-disable */ 
    finAllStudentApi, createStudentApi, finOneTeacherApi,
    updateTeacherApi
} from '@/api/administrator/StudentsService';
import { finAllCampusApi } from '@/api/administrator/CampusService';
import { finAllUniversitiesApi } from '@/api/administrator/UniversitiesService';
/* eslint-disable */ 
import { createUserApi, updateUserApi, deleteUserApi } from '@/api/administrator/UserService';
import { onMounted, ref } from "vue";
import TableStudents from "../../components/students/TableStudents.vue";
import { basicAlert, confirmBasic } from "@/helpers/SweetAlert";

export default ({
    components: {
        ModalCreate,
        ModalUpdate,
        TableStudents
    },
    setup() {
        const listStudents = ref([]);
        const listUniversities = ref([]);
        const listCampus = ref([]);
        const openModalEdit = ref(false);
        const objectTeacherEdit = ref({});

        const loadData = async () => {
            const [listStudentsResponse, listUniversitiesResponse, listCampusResponse] = await Promise.all([
                finAllStudentApi(),
                finAllUniversitiesApi(),
                finAllCampusApi()
            ])
            listStudents.value = listStudentsResponse.data.data;
            listUniversities.value = listUniversitiesResponse.data.data;
            listCampus.value = listCampusResponse.data.data;
        }

        onMounted(async () => {
            await loadData();
        })

        const createStudent = (data) => {
            if (data.name != "" && data.lastname != "" && data.codigo != "" && data.email != "" && data.username != "" && data.password != "") {
                data.rol = "ALUMNO"
                data.id_campus = listCampus.value.find(campus => campus.name == data.campus).id
                data.id_university = listUniversities.value.find(university => university.initials == data.university).id
                createUserApi(data)
                    .then(() => {
                        createStudentApi(data)
                            .then(response => {
                                basicAlert(() => {
                                    loadData();
                                }, 'success', 'Alumno creado', response.data.message)
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
                        }, 'success', 'Alumno eliminado', response.data.message)
                    })
                    .catch(error => {
                        // Mostrar Sweet Alert de error al consumir el API
                        basicAlert(() => { }, 'error', 'Error', error.response.data.message)
                    });
            }, '¿Estás seguro de eliminar a este alumno?', 'Eliminar');
        }

        const openEditItem = (data) => {
            finOneTeacherApi(data.id)
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
            listStudents,
            objectTeacherEdit,
            openModalEdit,
            listCampus,
            listUniversities,
            deleteItem,
            openEditItem,
            createStudent,
            updateTeacher
        }
    }
})
</script>