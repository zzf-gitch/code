<template>
    <div class="RootNav">
        <ul>
            <template v-for="item in list">
                <li>{{ item.name }}</li>
                <RootNav v-if="item.hasOwnProperty('children')" :list="item.children"/>
            </template>
        </ul>
    </div>
  </template>
  
  <script setup>
  import { ref , defineProps } from 'vue'
  const props = defineProps({
    list: Array
  })
  </script>
  