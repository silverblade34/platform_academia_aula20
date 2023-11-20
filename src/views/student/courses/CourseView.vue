<template>
    <h1 class="font-bold text-xl text-gray-500 title-views">Cursos</h1>
    <div class="py-5">
        <div class="cards_container gap-4">
            <CardCourse v-for="item in dataCourses" :key="item.course.id" :id="item.course.id" :title="item.course.name" />
        </div>
    </div>
</template>
<script>
import CardCourse from "@/components/courses/student/CardCourse.vue";
import { findAllCourseStudentApi } from '@/api/student/CourseService';
import { onMounted, ref } from "vue"
import store from "@/store";

export default ({
    components: {
        CardCourse
    },
    setup() {
        const dataCourses = ref([]);

        onMounted(() => {
            findAllCourseStudentApi(store.state.codigo)
                .then(response => {
                    dataCourses.value = response.data.data
                })
        })

        return {
            dataCourses
        }
    }
})
</script>
<style scoped>
.cards_container {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
}

@media screen and (max-width:1370px) {
    .cards_container {
        grid-template-columns: 33% 33% 33%;
    }
}

@media screen and (max-width:1170px) {
    .cards_container {
        grid-template-columns: 50% 50%;
    }
}

@media screen and (max-width:590px) {
    .cards_container {
        display: block;
    }
}
</style>