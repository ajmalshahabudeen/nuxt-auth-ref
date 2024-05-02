<script setup lang="ts">
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
const { signIn } = useAuth()
async function signInWithGithub() {
  await signIn('github', { callbackUrl: '/protected' })
}

const Email = ref()
const Password = ref()

const InvalidCredentials = ref(false)


async function signInWithCredentials() {
  const data = await signIn('credentials', { email: Email.value, password: Password.value, redirect: false }, { callbackUrl: '/protected' })
  if (data?.error) {
    // Do your custom error handling here
    InvalidCredentials.value = true
    const interval = setInterval(() => {
      InvalidCredentials.value = false
      clearInterval(interval)
    }, 3000)
  } else {
    // No error, continue with the sign in, e.g., by following the returned redirect:
    return navigateTo(data?.url, { external: true })
  }
}


definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/protected',
  }
})


</script>

<template>
  <div class="flex flex-col gap-5 justify-center items-center h-screen">
    <section class="flex flex-col gap-5 border-l-2 border-black pl-8 py-5">
      <p class="text-3xl font-extralight">Login</p>
      <form @submit.prevent="signInWithCredentials" class="flex flex-col gap-5">
        <Input v-model="Email" type="email" name="email" placeholder="Email" required />
        <Input v-model="Password" type="password" name="password" placeholder="Password" required />
        <p v-if="InvalidCredentials" class="text-red-500">Invalid Credentials</p>
        <Button :disabled="InvalidCredentials">SignIn With Credentials</Button>
      </form>
      <Button @click="signInWithGithub()">SignIn With Github</Button>
      <Button as-child variant="link">
        <NuxtLink to="/register">Create an Account</NuxtLink>
      </Button>
    </section>
  </div>
</template>
