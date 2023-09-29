<template>
    <div class="fixed bottom-0 left-0 w-full bg-white border-t z-[9900]">
        <div class="flex justify-center items-center py-1 gap-2">
            <NavItemMobile :item="item" v-for="item in navItems" :key="item.label" />
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import NavItemMobile from '@/components/generales/NavItemMobile.vue';

export default ({
    name: "NavMobile",
    components: {
        NavItemMobile
    },
    setup() {
        const navItems = ref([]);
        navItems.value = [
            {
                to: "/",
                label: "Dashboard",
                children: [],
                icon: "fa-solid fa-chart-line"
            },
        ]

        return { navItems };
    },
})
</script>