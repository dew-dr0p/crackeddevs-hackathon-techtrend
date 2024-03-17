<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue';
import MainPage from './components/MainPage.vue';

</script>

<template>
  <header class="container-base grid grid-flow-col justify-between items-center py-8">
    <PageHeader />
  </header>

  <main>
    <MainPage />
  </main>

  <footer>

  </footer>
</template>