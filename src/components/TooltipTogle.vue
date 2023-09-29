<template>
    <div class="d-flex justify-space-around">
      <v-btn @click="showTooltip = !showTooltip">
        Top
        <v-tooltip v-model="showTooltip" activator="parent" location="top">
          Tooltip
        </v-tooltip>
      </v-btn>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showTooltip: false,
      }
    },
  }
  </script>
  