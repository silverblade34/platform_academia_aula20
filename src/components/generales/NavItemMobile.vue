<template>
    <router-link :href="item.href" class="button-link my-2 flex cursor-pointer items-center py-3 px-4
        text-l font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-600" :to="item.to">
        <i :class="item.icon"></i>
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
<style lang="scss">
.active {
    background-color: #e5e5e5;
    font-weight: bold;
}

@media screen and (max-width: 660px) {
    .button-link {
        border-radius: 10px !important;
        &.router-link-exact-active {
            border-right: 0px;
            background-color: var(--azulbajo) !important;
            color: var(--white) !important;
        }
    }
}
</style>