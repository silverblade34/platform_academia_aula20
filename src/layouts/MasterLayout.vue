<template>
    <SidebarLayout />
    <div class="main-container w-full h-full overflow-y-scroll">
        <router-view />
    </div>
</template>
<script>
import SidebarLayout from '@/layouts/SidebarLayout.vue';

export default ({
    components: {
        SidebarLayout
    }
})
</script>