<template>
    <h1 class="font-bold text-xl text-gray-500 title-views">Dashboard</h1>
    <div class="py-5">
        <div class="grid grid-cols-4 gap-6 pb-6">
            <CardResume v-for="card in listCards" :dataCard="card" :key="card.title" />
            <CardPerfomance />
        </div>
        <div class="grid grid-cols-3 gap-6 pb-6">
            <div class="p-4 rounded-lg bg-white shadow-sm">
                <p class="title-views text-center text-gray-500 pb-3">Evaluaciones realizadas por curso</p>
                <BarChart :dataChart="dataBarChart" />
            </div>
            <div class="p-4 rounded-lg bg-white shadow-sm">
                <p class="title-views text-center text-gray-500 pb-3">Preguntas evaluadas por curso</p>
                <DoughnutChart :dataChart="dataDoughnutChart" />
            </div>
            <div class="p-4 rounded-lg bg-white shadow-sm">
                <p class="title-views text-center text-gray-500 pb-3">Exámenes realizados por día</p>
                <LineChart :dataChart="dataLineChart" />
            </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <TableCourseEvaluations :desserts="courseEvaluationsData"/>
        </div>
    </div>
</template>
<script>
import BarChart from '@/components/home/BarChart.vue';
import DoughnutChart from '@/components/home/DoughnutChart.vue';
import LineChart from '@/components/home/LineChart.vue';
import CardResume from '@/components/home/CardResume.vue';
import CardPerfomance from '@/components/home/CardPerfomance.vue';
import { dashboardCourseEvaluationsApi, findAllCourseEvaluationsApi } from '@/api/student/DashboardService';
import TableCourseEvaluations from '@/components/home/TableCourseEvaluations.vue';
import store from '@/store';
import { onMounted, ref } from 'vue';


export default ({
    components: {
        BarChart,
        DoughnutChart,
        LineChart,
        CardResume,
        CardPerfomance,
        TableCourseEvaluations
    },
    setup() {
        const dataBarChart = ref([]);
        const dataDoughnutChart = ref([]);
        const dataLineChart = ref([]);
        const courseEvaluationsData = ref([]);

        onMounted(() => {
            dashboardCourseEvaluationsApi(store.state.codigo)
                .then(response => {
                    dataBarChart.value = response.data.data.barChart
                    dataDoughnutChart.value = response.data.data.doughnutChart
                    dataLineChart.value = response.data.data.lineChart
                })
            findAllCourseEvaluationsApi(store.state.codigo)
                .then(response => {
                    courseEvaluationsData.value = response.data.data
                })
        })

        const listCards = [
            {
                title: "Simulacros realizados",
                message: "Puedes realizar simulacros ilimitadamente, arriesgate !!",
                bg_color: "bg-blue-400",
                number: 69
            },
            {
                title: "Simulacros aprobados",
                message: "La mejor forma de predecir el futuro es crearlo!!",
                bg_color: "bg-green-400",
                number: 29
            },
            {
                title: "Simulacros desaprobados",
                message: "Recuerda que puede solicitar una asesoria personalizada",
                bg_color: "bg-red-400",
                number: 40
            }
        ]
        return {
            courseEvaluationsData,
            dataBarChart,
            dataDoughnutChart,
            dataLineChart,
            listCards
        }
    }
})
</script>
<style>
.number_card {
    font-family: 'Poppins', sans-serif;
}
</style>