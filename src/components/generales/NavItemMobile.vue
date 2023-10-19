<template>
    <router-link :to="item.to" class="flex items-center">
        <v-btn>
            <v-icon>{{ item.icon }}</v-icon>
            <span class="text-xs normal-case">{{ item.label }}</span>
        </v-btn>
    </router-link>
</template>
<script>
export default ({
    name: "NavItemMobile",
    props: {
        item: Object
    }
})
</script>
