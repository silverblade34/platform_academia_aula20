<template>
    <h1 class="font-bold text-xl text-teal-500">Especialidades</h1>
    <div class="py-5">
        <div class="grid grid-cols-4 gap-5 w-full">
            <CardSpecialtie v-for="specialtie in listCardsSpecialtie" :title="specialtie.curso" :id="specialtie.id"
                :key="specialtie" />
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
            {
                curso: 'Geometria',
                id: 1
            },
            {
                curso: 'Trigonometria',
                id: 2
            }
        ])
        return {
            listCardsSpecialtie
        }
    }
})
</script>