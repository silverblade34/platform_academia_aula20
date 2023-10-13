<template>
    <section class="min-h-full w-full lg:pb-[3rem]">
        <router-link to='/especialidades'>
            <div
                class="w-full flex justify-start items-center mb-3 text-sm text-blue-500 hover:text-blue-600 cursor-pointer">
                <span> <v-icon>mdi mdi-chevron-left</v-icon> Regresar</span>
            </div>
        </router-link>
        <h1 class="font-bold text-xl text-teal-500">Temarios del curso</h1>
        <div class="py-5">
            <div class="grid grid-cols-4 gap-5 w-full">
                <CardSyllabus v-for="i in 10" :key="i" :id="i"/>
            </div>
        </div>
    </section>
</template>
<script>
import CardSyllabus from '@/components/specialties/CardSyllabus.vue';

export default ({
    components: {
        CardSyllabus
    },
    props: {
        id: String
    }
})
</script>