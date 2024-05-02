<template>
  <div class="flex flex-col justify-center items-center h-screen gap-5">
    <p class="text-3xl font-extralight">Nuxt Authentication using sidebase</p>
    <Button as-child class="px-10">
      <NuxtLink to="/login">Login</NuxtLink>
    </Button>
    <Button as-child class="px-10">
      <NuxtLink to="/protected">Protected</NuxtLink>
    </Button>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ auth: false })
</script>

<style>

</style>