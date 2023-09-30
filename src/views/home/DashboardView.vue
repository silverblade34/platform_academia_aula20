<template>
    <h1 class="font-bold text-xl text-gray-500">Dashboard</h1>
    <div class="pt-5">
        <div class="grid grid-cols-4 gap-6 pb-6">
            <CardResume v-for="card in listCards" :dataCard="card" :key="card.title"/>
            <div class="rounded-lg bg-white p-6 shadow-sm flex items-center">
                <div class="w-full">
                    <div>
                        <p class="font-bold number_card text-gray-500">Cursos con mejor perfomance</p>
                    </div>
                    <div class="flex gap-3 pt-1">
                        <div class="flex items-center">
                            <div class="text-sm">
                                <p>Geometria</p>
                                <p>Literatura</p>
                            </div>
                        </div>
                        <div class="flex items-center w-full">
                            <div class="w-full">
                                <div class="w-full bg-gray-200 rounded-full h-2.5 my-3">
                                    <div class="bg-yellow-400 h-2.5 rounded-full" style="width: 45%"></div>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2.5 my-3">
                                    <div class="bg-indigo-600 h-2.5 rounded-full" style="width: 45%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

export default ({
    components: {
        BarChart,
        DoughnutChart,
        LineChart,
        CardResume
    },
setup(){
    const listCards = [
        {
            title: "Simulacros realizados",
            message: "Puedes realizar simulacros ilimitadamente, arriesgate !!",
            bg_color: "blue",
            number: 69
        },
        {
            title: "Simulacros aprobados",
            message: "La mejor forma de predecir el futuro es crearlo!!",
            bg_color: "green",
            number: 29
        },
        {
            title: "Simulacros desaprobados",
            message: "Recuerda que puede solicitar una asesoria personalizada",
            bg_color: "red",
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