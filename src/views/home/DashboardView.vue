<template>
    <h1 class="font-bold text-xl text-gray-500">Dashboard</h1>
    <div class="py-5">
        <div class="grid grid-cols-4 gap-6 pb-6">
            <CardResume v-for="card in listCards" :dataCard="card" :key="card.title" />
            <CardPerfomance />
        </div>
        <div class="grid grid-cols-3 gap-6 pb-6">
            <BarChart />
            <DoughnutChart />
            <LineChart />
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Color
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Apple MacBook Pro 17"
                        </th>
                        <td class="px-6 py-4">
                            Silver
                        </td>
                        <td class="px-6 py-4">
                            Laptop
                        </td>
                        <td class="px-6 py-4">
                            $2999
                        </td>
                        <td class="px-6 py-4">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Microsoft Surface Pro
                        </th>
                        <td class="px-6 py-4">
                            White
                        </td>
                        <td class="px-6 py-4">
                            Laptop PC
                        </td>
                        <td class="px-6 py-4">
                            $1999
                        </td>
                        <td class="px-6 py-4">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Magic Mouse 2
                        </th>
                        <td class="px-6 py-4">
                            Black
                        </td>
                        <td class="px-6 py-4">
                            Accessories
                        </td>
                        <td class="px-6 py-4">
                            $99
                        </td>
                        <td class="px-6 py-4">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import BarChart from '@/components/home/BarChart.vue';
import DoughnutChart from '@/components/home/DoughnutChart.vue';
import LineChart from '@/components/home/LineChart.vue';
import CardResume from '@/components/home/CardResume.vue';
import CardPerfomance from '@/components/home/CardPerfomance.vue';

export default ({
    components: {
        BarChart,
        DoughnutChart,
        LineChart,
        CardResume,
        CardPerfomance
    },
    setup() {
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