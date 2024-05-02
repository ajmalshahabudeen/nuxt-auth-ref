<template>
  <div>
    <pre>{{ JSON.stringify({status, data}, null, 2) }}</pre>
    <Button @click="signOut({callbackUrl: '/login'})">SignOut</Button>
  </div>
</template>

<script lang="ts" setup>
import Button from '~/components/ui/button/Button.vue';


const {status, data, signOut} = useAuth()

</script>

<style>

</style>