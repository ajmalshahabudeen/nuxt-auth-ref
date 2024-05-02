<template>
  <div class="flex flex-col p-10 h-screen gap-5">
    <pre>{{ JSON.stringify({status, data}, null, 2) }}</pre>
    <Button as-child class="w-56">
      <NuxtLink to="/protected/dashboard">Dashboard</NuxtLink>
    </Button>
    <Button class="w-56" @click="signOut({callbackUrl: '/login'})">SignOut</Button>
  </div>
</template>

<script lang="ts" setup>
import Button from '~/components/ui/button/Button.vue';


const {status, data, signOut} = useAuth()

</script>

<style>

</style>