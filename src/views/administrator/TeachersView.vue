<template>
    <div class="flex justify-between">
        <h1 class="font-bold text-xl text-gray-500 title-views">Profesores</h1>
        <ModalCreate @create-teacher="createTeacher" :listCourse="listCourses" />
    </div>
    <div class="py-5">
        <TableTeachers :desserts="listTeachers" @delete-item="onDeleteItem" @edit-item="onEditItem"
            @courses-item="onCoursesItem" />
    </div>
    <ModalUpdate :openModal="openModalEdit" :objectTeacher="objectTeacherEdit" @close-modal="openModalEdit = false"
        @update-teacher="updateTeacher" />
    <ModalSpecialties :data="coursesTeacher" :openModal="openModalCourses" @close-modal="openModalCourses = false" />
</template>
<script>
/* eslint-disable */
import ModalCreate from "@/components/teachers/ModalCreate.vue";
import ModalUpdate from "@/components/teachers/ModalUpdate.vue";
import ModalSpecialties from "@/components/teachers/ModalSpecialties.vue";
import {
    findAllTeachersApi, createTeacherApi, findOneTeacherApi,
    updateTeacherApi, deleteTeacherApi
} from '@/api/administrator/TeachersService';
import { findAllCourseApi } from '@/api/administrator/CourseService';
import { updateUserApi } from '@/api/administrator/UserService';
import { onMounted, ref } from "vue";
import TableTeachers from "../../components/teachers/TableTeachers.vue";
import { basicAlert, confirmBasic } from "@/helpers/SweetAlert";

export default ({
    components: {
        ModalSpecialties,
        ModalCreate,
        ModalUpdate,
        TableTeachers
    },
    setup() {
        const listTeachers = ref([]);
        const listCourses = ref([]);
        const openModalEdit = ref(false);
        const openModalCourses = ref(false);
        const objectTeacherEdit = ref({});
        const coursesTeacher = ref([]);

        const loadData = async () => {
            const [teacherResponse, coursesResponse] = await Promise.all([
                findAllTeachersApi(),
                findAllCourseApi()
            ])
            listTeachers.value = teacherResponse.data.data;
            listCourses.value = coursesResponse.data.data;
        }

        onMounted(async () => {
            await loadData();
        })

        const createTeacher = (data) => {
            if (data.name != "" && data.lastName != "" && data.codigo != "" && data.email != "" && data.username != "" && data.password != "" && data.courses.length != 0) {
                createTeacherApi(data)
                    .then(response => {
                        basicAlert(() => {
                            loadData();
                        }, 'success', 'Profesor creado', response.data.message)
                    })
                    .catch(error => {
                        console.log(error)
                        basicAlert(() => { }, 'error', 'Error', error.response.data.message)
                    })
            } else {
                basicAlert(() => { }, 'warning', 'Campos vacios', "Revise los campos obligatorios")
            }
        }

        const onDeleteItem = (data) => {
            confirmBasic(() => {
                deleteTeacherApi(data.id)
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

        const onEditItem = (data) => {
            findOneTeacherApi(data.id)
                .then(response => {
                    objectTeacherEdit.value = response.data.data;
                    openModalEdit.value = true;
                })
        }

        const onCoursesItem = (data) => {
            coursesTeacher.value = data.data.teacherCourses.map(teachercourse => {
                return {
                    name: teachercourse.course.name
                }
            })
            openModalCourses.value = true;
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
            coursesTeacher,
            listCourses,
            listTeachers,
            objectTeacherEdit,
            openModalEdit,
            openModalCourses,
            onCoursesItem,
            onDeleteItem,
            onEditItem,
            createTeacher,
            updateTeacher
        }
    }
})
</script>