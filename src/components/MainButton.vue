<script setup lang="ts">
const props = defineProps<{
    targetScroll?: HTMLElement
}>()

const scrollToTarget = () => {
    const target = props.targetScroll as HTMLElement

    window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
    })
}
</script>

<template>
    <button @click="scrollToTarget" class="bg-primary text-white p-3 px-8 font-bold rounded-2xl">Have A Look</button>
</template>