<template>
    <div class="flex justify-between">
        <h1 class="font-bold text-xl text-gray-500 title-views">Cursos</h1>
    </div>
    <div class="py-5">
        <TableCourse :desserts="listCourse" @syllabus-item="onSyllabusItem" />
    </div>
    <ModalSyllabus :data="dataSyllabus" :openModal="openModalSyllabus"/>
</template>
<script>
import TableCourse from '@/components/courses/administrator/TableCourse.vue';
import ModalSyllabus from '@/components/courses/administrator/ModalSyllabus.vue';
import { findAllCourseApi } from '@/api/administrator/CourseService';
import { onMounted, ref } from 'vue';

export default ({
    components: {
        TableCourse,
        ModalSyllabus
    },
    setup() {
        const listCourse = ref([]);
        const dataSyllabus = ref([])
        const openModalSyllabus = ref(false)

        onMounted(async () => {
            await findAllCourseApi()
                .then(response => {
                    listCourse.value = response.data.data
                })
                .catch(error => {
                    console.log(error.response.message)
                })
        })

        const onSyllabusItem = (data) => {
            dataSyllabus.value = data.data
            openModalSyllabus.value = true
        }

        return {
            listCourse,
            dataSyllabus,
            openModalSyllabus,
            onSyllabusItem
        }
    }
})
</script>