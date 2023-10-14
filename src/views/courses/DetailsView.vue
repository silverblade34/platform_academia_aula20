<template>
    <div class="flex justify-between">
        <h1 class="font-bold text-xl text-gray-500 title-views">Trigonometria</h1>
        <ModalSelect />
    </div>
    <div class="py-5">
        <div class="grid grid-cols-2 gap-10">
            <div class="bg-white p-5 rounded-lg shadow">
                <h2 class="title-views text-teal-400 text-lg pb-4">Registro de notas</h2>
                <RecordNotes />
            </div>
            <div class="bg-white p-5 rounded-lg shadow">
                <h2 class="title-views text-teal-400 text-lg pb-4">Temarios del curso</h2>
                <div class="p-2 bg-gray-100 w-full rounded-lg px-4 my-2">
                    <p>Planteo de ecuaciones</p>
                </div>
                <div class="p-2 bg-gray-100 w-full rounded-lg px-4 my-2">
                    <p>Figuras geometricas</p>
                </div>
                <div class="p-2 bg-gray-100 w-full rounded-lg px-4 my-2">
                    <p>Planteo de ecuaciones</p>
                </div>
                <div class="p-2 bg-gray-100 w-full rounded-lg px-4 my-2">
                    <p>Figuras geometricas</p>
                </div>
                <div class="p-2 bg-gray-100 w-full rounded-lg px-4 my-2">
                    <p>Planteo de ecuaciones</p>
                </div>
                <div class="p-2 bg-gray-100 w-full rounded-lg px-4 my-2">
                    <p>Figuras geometricas</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import RecordNotes from '@/components/courses/RecordNotes.vue';
import ModalSelect from '@/components/courses/ModalSelect.vue';

export default ({
    components: {
        RecordNotes,
        ModalSelect
    }
})
</script>