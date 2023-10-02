<template>
    <h1 class="font-bold text-xl text-gray-500">Especialidades</h1>
    <div class="py-5">
        <div class="grid grid-cols-4 gap-5 w-full">
            <CardSpecialtie v-for="specialtie in listCardsSpecialtie" :title="specialtie" :key="specialtie" />
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import CardSpecialtie from "@/components/specialties/CardSpecialtie.vue"

export default ({
    name: 'SpecialtiesView',
    components: {
        CardSpecialtie
    },
    setup() {
        const listCardsSpecialtie = ref([
            'Geometria',
            'Trigonometria'
        ])
        return {
            listCardsSpecialtie
        }
    }
})
</script>