<template>
    <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Fecha realizada
                </th>
                <th scope="col" class="px-6 py-3">
                    Curso
                </th>
                <th scope="col" class="px-6 py-3">
                    P. correctas
                </th>
                <th scope="col" class="px-6 py-3">
                    P. incorrectas
                </th>
                <th scope="col" class="px-6 py-3">
                    Nota
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b" v-for="item in desserts" :key="item.id">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                   {{ item.formattedDate }}
                </th>
                <td class="px-6 py-4">
                    {{ item.course.name }}
                </td>
                <td class="px-6 py-4">
                    {{ item.correctQuestions}}
                </td>
                <td class="px-6 py-4">
                    {{ item.wrongQuestions}}
                </td>
                <td class="px-6 py-4">
                    {{ item.score}}
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default ({
    props: {
        desserts: Array
    }
})
</script>