<template>
    <h1 class="font-bold text-xl text-gray-500">Cursos</h1>
    <div class="py-5">
        <div class="grid grid-cols-4 gap-5">
            <CardCourse v-for="course in listcourses" :key="course" />
        </div>
    </div>
</template>
<script>
import CardCourse from "@/components/courses/CardCourse.vue"
import { ref } from "vue"

export default ({
    components: {
        CardCourse
    },
    setup() {
        const listcourses = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        return { listcourses }
    }
})
</script>