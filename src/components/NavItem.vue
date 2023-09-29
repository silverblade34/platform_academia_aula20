<script setup>
import { defineProps } from 'vue';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/vue"
// eslint-disable-next-line
const props = defineProps({
    item: Object,
})
</script>
<template>
    <router-link v-if="!item.children.length" :href="item.href" :class="{ 'active': isCurrentPage }" class="flex cursor-pointer w-full rounded-md items-center py-3 px-4
        text-l font-medium text-gray-600 hover:bg-gray-200" :to="item.to">
        <v-icon class="mr-2" :name="item.icon" />
        <span class="label">{{ item.label }}</span>
    </router-link>
    <Disclosure v-else v-slot="{ open }">
        <span class=""> <!-- Solución: Envolver el contenido en una etiqueta div -->
            <DisclosureButton class="flex rounded-md text-left w-full items-center py-3
                px-4 text-l font-medium text-gray-600 hover:bg-gray-200">
                <v-icon class="mr-2" :name="item.icon" />
                <span class="flex-1 label">{{ item.label }}</span>
                <v-icon :class="[open ? '-rotate-180' : '']" name="md-keyboardarrowdown-sharp" />
            </DisclosureButton>
            <DisclosurePanel class="text-gray-500 px-4">
                <NavItem v-for="child in item.children" :item="child" :key="child.label" />
            </DisclosurePanel>
        </span>
    </Disclosure>
</template>

<style>
.active {
    background-color: #e5e5e5;
    font-weight: bold;
}
</style>