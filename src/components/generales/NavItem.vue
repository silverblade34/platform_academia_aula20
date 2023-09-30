<template>
    <router-link v-if="!item.children.length" :href="item.href" class="button-link my-2 flex cursor-pointer w-full items-center py-3 px-4
         text-gray-500 hover:bg-gray-100 hover:text-gray-600" :to="item.to" :title="item.label">
        <i :class="item.icon"></i>
        <span class="label">{{ item.label }}</span>
    </router-link>
    <Disclosure v-else v-slot="{ open }">
        <span class="p-0 py-0 path_desplegado">
            <DisclosureButton class="button-link flex rounded-md text-left w-full items-center py-3
                px-4 text-l  text-gray-500 hover:bg-gray-100 hover:text-gray-600">
                <i :class="item.icon" class="text-gray-500"></i>
                <span class="flex-1 label text-gray-500">{{ item.label }}</span>
                <i :class="[open ? '-rotate-180' : '']" class="fa-solid fa-angle-down icono_arrow text-gray-500"></i>
            </DisclosureButton>
            <DisclosurePanel class="text-gray-500 px-4">
                <NavItem v-for="child in item.children" :item="child" :key="child.label" />
            </DisclosurePanel>
        </span>
    </Disclosure>
</template>
<script>
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/vue"

export default ({
    props: {
        item: Object,
        expandido: Boolean
    },
    components: {
        Disclosure,
        DisclosureButton,
        DisclosurePanel
    }
})
</script>
<style lang="scss">
.active {
    background-color: #e5e5e5;
    font-weight: bold;
}

.button-link {
    border-radius: 0px !important;

    &.router-link-exact-active {
        color: #0b46c4 !important;
        font-weight: 500 !important;
        background: rgb(236, 245, 255) !important;
        border-right: 3px solid rgb(45, 98, 214);
    }
}

.label{
    font-family: 'Poppins', sans-serif;
}

.path_desplegado {
    .button-link {
        &.router-link-exact-active {
            color: #0b46c4 !important;
            font-weight: 500 !important;
            background: rgb(236, 245, 255) !important;
            border-right: 0px solid rgba(255, 255, 255, 0);
            border-radius: 6px !important;
        }
    }
}
</style>