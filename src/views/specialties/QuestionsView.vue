<template>
    <section class="min-h-full w-full lg:pb-[2rem]">
        <h1 class="font-bold text-xl text-gray-500">Preguntas del tema</h1>
        <div class="py-5">
            <TableQuestion />
        </div>
    </section>
</template>
<script>
import TableQuestion from '@/components/specialties/TableQuestion.vue';

export default ({
    components: {
        TableQuestion
    }
})
</script>