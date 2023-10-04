<template>
    <section class="min-h-full w-full lg:pb-[2rem]">
        <h1 class="font-bold text-xl text-gray-500">Temarios del curso</h1>
        <div class="py-5">
            <div class="grid grid-cols-4 gap-5 w-full">
                <CardSyllabus v-for="i in 10" :key="i" />
            </div>
        </div>
    </section>
</template>
<script>
import CardSyllabus from '@/components/specialties/CardSyllabus.vue';

export default ({
    components: {
        CardSyllabus
    }
})
</script>