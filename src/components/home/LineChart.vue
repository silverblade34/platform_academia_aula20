<template>
    <div class="min-h-[15rem]">
        <Line :data="data" :options="options" />
    </div>
</template>
<script>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'vue-chartjs';
import { ref, watch } from 'vue';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
export default {
    name: 'BarChart',
    components: {
        Line
    },
    props: {
        dataChart: Array
    },
    setup(props) {
        const data = ref(
            {
                labels: [],
                datasets: [
                    {
                        backgroundColor: ['#FFD1DC', '#FFD700', '#B2FF66', '#AEC6CF'],
                        data: []
                    }
                ]
            }
        );

        watch(() => props.dataChart, (newVal) => {
            if (newVal.length > 0) {
                data.value = {
                    labels: props.dataChart.map(data => data.day),
                    datasets: [
                        {
                            label: 'Preguntas',
                            backgroundColor: '#f87979',
                            data: props.dataChart.map(data => data.amount)
                        }
                    ]
                }
            }
        })

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