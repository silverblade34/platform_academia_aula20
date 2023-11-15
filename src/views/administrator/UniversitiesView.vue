<template>
    <div class="flex justify-between">
        <h1 class="font-bold text-xl text-gray-500 title-views">Universidades</h1>
        <ModalCreate @create-university="createUniversities" :listCourse="listCourses" />
    </div>
    <div class="py-5">
        <TableUniversities :desserts="listUniversities" @delete-item="deleteItem" @edit-item="openEditItem"
            @setting-item="onSettingItem" />
    </div>
    <ModalUpdate :openModal="openModalEdit" :objectUniversity="universityEdit" @close-modal="openModalEdit = false"
        @update-university="updateUniversity" />
    <ModalCourses :data="coursesUniversity" :openModal="openModalCourses" @close-modal="openModalCourses = false" />
</template>
<script>
/* eslint-disable */
import ModalCourses from "@/components/universities/ModalCourses.vue";
import ModalCreate from "@/components/universities/ModalCreate.vue";
import ModalUpdate from "@/components/universities/ModalUpdate.vue";
import {
    finAllUniversitiesApi, createUniversitiesApi, deleteUniversitiesApi,
    finOneUniversitiesApi, updateUniversitiesApi
} from '@/api/administrator/UniversitiesService';
import { findAllCourseApi } from '@/api/administrator/CourseService';
import { onMounted, ref } from "vue";
import TableUniversities from "@/components/universities/TableUniversities.vue";
import { basicAlert, confirmBasic } from "@/helpers/SweetAlert";


export default ({
    components: {
        ModalCourses,
        ModalCreate,
        ModalUpdate,
        TableUniversities
    },
    setup() {
        const listUniversities = ref([]);
        const listCourses = ref([]);
        const openModalEdit = ref(false);
        const universityEdit = ref({});
        const coursesUniversity = ref([]);
        const openModalCourses = ref(false);

        const loadData = async () => {
            const [universitiesResponse, coursesResponse] = await Promise.all([
                finAllUniversitiesApi(),
                findAllCourseApi()
            ])
            listUniversities.value = universitiesResponse.data.data;
            listCourses.value = coursesResponse.data.data
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
                        console.log(error)
                        basicAlert(() => { }, 'error', 'Error', error.response.data.message)
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
                    universityEdit.value = response.data.data;
                    openModalEdit.value = true;
                })
        }

        const onSettingItem = (data) => {
            coursesUniversity.value = data.universityCourse;
            openModalCourses.value = true
        }

        const updateUniversity = (data) => {
            if (data.name != "" && data.initials != "") {
                updateUniversitiesApi(universityEdit.value.id, data)
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
            listCourses,
            listUniversities,
            openModalEdit,
            openModalCourses,
            universityEdit,
            coursesUniversity,
            createUniversities,
            updateUniversity,
            onSettingItem,
            deleteItem,
            openEditItem
        }
    }
})
</script>