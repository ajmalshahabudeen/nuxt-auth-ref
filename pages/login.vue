<script setup lang="ts">
import { Button } from '~/components/ui/button';
const { signIn } = useAuth()
async function signInWithCredentials() {
  await signIn('github', { callbackUrl: '/protected' })
}

const user = ref()

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/protected',

  }
})

</script>

<template>
  <pre>{{ JSON.stringify(user, null, 2) }}</pre>
  <div class="flex justify-center items-center h-screen">
    <Button @click="signInWithCredentials()">SignIn With Github</Button>
  </div>
</template>
