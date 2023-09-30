<template>
    <div class="p-4 rounded-lg bg-white shadow-sm min-h-[15rem]">
        <Doughnut :data="data" :options="options" />
    </div>
</template>
<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'DoughnutChart',
    components: {
        Doughnut
    },
    setup() {
        const data = {
            labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
            datasets: [
                {
                    backgroundColor: ['#FFD1DC', '#FFD700', '#B2FF66', '#AEC6CF'],
                    data: [40, 20, 80, 10]
                }
            ]
        }

        const options = {
            responsive: true,
            maintainAspectRatio: false
        }
        return {
            options,
            data
        }
    }
}
</script>