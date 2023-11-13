<template>
    <div class="flex justify-between">
        <h1 class="font-bold text-xl text-gray-500 title-views">Cursos</h1>
        <ModalCreate @create-course="onCreateCourse" />
    </div>
    <div class="py-5">
        <TableCourse :desserts="listCourse" @syllabus-item="onSyllabusItem" />
    </div>
    <ModalSyllabus :data="dataSyllabus" :openModal="openModalSyllabus" @close-modal="openModalSyllabus = false" />
</template>
<script>
import TableCourse from '@/components/courses/administrator/TableCourse.vue';
import ModalSyllabus from '@/components/courses/administrator/ModalSyllabus.vue';
import ModalCreate from '@/components/courses/administrator/ModalCreate.vue';
import { findAllCourseApi, createCourseApi } from '@/api/administrator/CourseService';
import { onMounted, ref } from 'vue';
import { basicAlert } from "@/helpers/SweetAlert";
export default ({
    components: {
        TableCourse,
        ModalSyllabus,
        ModalCreate
    },
    setup() {
        const listCourse = ref([]);
        const dataSyllabus = ref([])
        const openModalSyllabus = ref(false)

        onMounted(async () => {
            await reloadData()
        })

        const reloadData = async () => {
            await findAllCourseApi()
                .then(response => {
                    listCourse.value = response.data.data
                })
                .catch(error => {
                    console.log(error.response.message)
                })
        }

        const onSyllabusItem = (data) => {
            dataSyllabus.value = data.data
            openModalSyllabus.value = true
        }

        const onCreateCourse = (data) => {
            createCourseApi(data)
                .then(response => {
                    basicAlert(() => { }, 'success', 'Logrado', response.data.message)
                    reloadData()
                }).catch(error => {
                    console.log(error.response.message)
                })
        }

        return {
            listCourse,
            dataSyllabus,
            openModalSyllabus,
            onCreateCourse,
            onSyllabusItem
        }
    }
})
</script>