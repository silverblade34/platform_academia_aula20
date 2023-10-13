<template>
    <section class="min-h-full w-full lg:pb-[2rem]">
        <router-link :to="'/temarioscurso_profesores/' + id">
            <div
                class="w-full flex justify-start items-center mb-3 text-sm text-blue-500 hover:text-blue-600 cursor-pointer">
                <span> <v-icon>mdi mdi-chevron-left</v-icon> Regresar</span>
            </div>
        </router-link>
        <h1 class="font-bold text-xl text-teal-500">Preguntas del tema - {{ id }}</h1>
        <div class="py-5">
            <TableQuestion />
        </div>
    </section>
</template>
<script>
import TableQuestion from '@/components/specialties/TableQuestion.vue';

export default ({
    props: {
        id: String
    },
    components: {
        TableQuestion
    }
})
</script>