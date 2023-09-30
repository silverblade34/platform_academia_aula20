<template>
    <div class="rounded-lg bg-white p-6 flex shadow-sm justify-between items-center">
        <div>
            <p class="font-bold number_card text-gray-500">{{dataCard.title}}</p>
            <p class="text-xs">{{dataCard.message}}</p>
        </div>
        <div>
            <span :class="`h-[4rem] w-[4rem] flex items-center text-xl
                    justify-center rounded-lg ${dataCard.bg_color} font-extrabold text-white number_card`">{{dataCard.number}}</span>
        </div>
    </div>
</template>
<script>
export default({
    props:{
        dataCard: Object,
    }
})
</script>