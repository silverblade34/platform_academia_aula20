<template>
    <h1 class="font-bold text-xl text-gray-500 title-views">Especialidades</h1>
    <div class="py-5">
        <div class="md:grid lg:grid-cols-4 md:grid-cols-3 block gap-5 w-full">
            <CardSpecialtie v-for="specialtie in listCardsSpecialtie" :title="specialtie.course.name"
                :id="specialtie.course.id" :key="specialtie.course.id" />
        </div>
    </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import CardSpecialtie from "@/components/specialties/CardSpecialtie.vue"
import { courseTeacherApi } from '@/api/teacher/CourseService';
import store from '@/store';

export default ({
    name: 'SpecialtiesView',
    components: {
        CardSpecialtie
    },
    setup() {
        const listCardsSpecialtie = ref([])

        onMounted(async () => {
            const coursesTeacherResponse = await courseTeacherApi(store.state.codigo)
            listCardsSpecialtie.value = coursesTeacherResponse.data.data
        })

        return {
            listCardsSpecialtie
        }
    }
})
</script>