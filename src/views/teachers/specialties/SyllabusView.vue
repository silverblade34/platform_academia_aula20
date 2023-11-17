<template>
    <section class="min-h-full w-full lg:pb-[3rem]">
        <div class="w-full flex justify-start items-center mb-3 text-sm text-gray-400 hover:text-gray-500 cursor-pointer">
            <router-link to='/especialidades'> <span> <v-btn icon="mdi mdi-chevron-left" variant="text"></v-btn> Regresar</span> </router-link>
        </div>
        <h1 class="font-bold text-xl text-gray-500 title-views">Temarios del curso</h1>
        <div class="py-5">
            <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-5 w-full">
                <CardSyllabus v-for="syllabus in courseSyllabus.syllabus" :syllabusItems="syllabus.itemsWithColor"
                    :courseName="courseSyllabus.name" :syllabusName="syllabus.name" :key="syllabus.id" />
            </div>
        </div>
    </section>
</template>
<script>
/* eslint-disable */
import CardSyllabus from '@/components/specialties/CardSyllabus.vue';
import { onMounted, ref } from 'vue';
import { findSyllabusCourseApi } from '@/api/teacher/CourseService';

export default ({
    components: {
        CardSyllabus
    },
    props: {
        id: String
    },
    setup(props) {
        const courseSyllabus = ref({});

        onMounted(() => {
            findSyllabusCourseApi(props.id)
                .then(response => {
                    courseSyllabus.value = response.data.data
                })
                .catch(error => {
                    console.log(error)
                })
        })
        return {
            courseSyllabus
        }
    }
})
</script>