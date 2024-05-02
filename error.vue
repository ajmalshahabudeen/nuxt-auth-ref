<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <h1 class="text-3xl font-extralight">{{ (error as any).statusCode }}</h1>
    <NuxtLink class="text-xl font-extralight border border-black p-2 rounded-none hover:bg-black hover:text-slate-50" to="/">Go back home</NuxtLink>
  </div>
</template>
