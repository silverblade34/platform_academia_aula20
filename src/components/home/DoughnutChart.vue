<template>
    <div class="min-h-[15rem]">
        <Doughnut :data="data" :options="options" />
    </div>
</template>
<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { ref, watch } from 'vue'
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'DoughnutChart',
    components: {
        Doughnut
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
                        backgroundColor: [
                                '#FFD700', // Amarillo pastel
                                '#B2FF66', // Verde pastel
                                '#AEC6CF', // Azul grisáceo pastel
                                '#ADD8E6', // Azul claro
                                '#87CEEB', // Azul cielo
                                '#98FB98', // Verde claro
                                '#FFFACD', // Beige
                                '#F0E68C', // Amarillo claro
                                '#F5DEB3', // Trigo
                                '#FFA07A', // Salmón claro
                                '#FFEBCD', // Blanco antiguo
                                '#D8BFD8', // Lavanda
                                '#FAEBD7', // Blanco almendra
                                '#F0F8FF', // Azul Alice
                                '#FFFFE0',
                                '#E0FFFF',
                                '#F5F5DC',
                                '#FFEFD5'
                            ],
                        data: []
                    }
                ]
            }
        );

        watch(() => props.dataChart, (newVal) => {
            if (newVal.length > 0) {
                data.value = {
                    labels: newVal.map(data => data.name),
                    datasets: [
                        {
                            backgroundColor: [
                                '#FFD700', // Amarillo pastel
                                '#B2FF66', // Verde pastel
                                '#AEC6CF', // Azul grisáceo pastel
                                '#ADD8E6', // Azul claro
                                '#87CEEB', // Azul cielo
                                '#98FB98', // Verde claro
                                '#FFFACD', // Beige
                                '#F0E68C', // Amarillo claro
                                '#F5DEB3', // Trigo
                                '#FFA07A', // Salmón claro
                                '#FFEBCD', // Blanco antiguo
                                '#D8BFD8', // Lavanda
                                '#FAEBD7', // Blanco almendra
                                '#F0F8FF', // Azul Alice
                                '#FFFFE0',
                                '#E0FFFF',
                                '#F5F5DC',
                                '#FFEFD5'
                            ],
                            data: newVal.map(data => data.questions)
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