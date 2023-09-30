<template>
    <div class="p-4 rounded-lg bg-white shadow-sm min-h-[15rem]">
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
    setup() {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [40, 39, 10, 40, 39, 80, 40]
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