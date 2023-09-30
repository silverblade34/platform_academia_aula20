<template>
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
</template>
<script>
export default({
    name: "CardPerfomance"
})
</script>