<template>
    <iframe :src="url" class="iframe-container" />
</template>

<script setup>
const props = defineProps({
    url: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
.iframe-container{
    width: 100vw;
    height: 100vh;
}
</style>