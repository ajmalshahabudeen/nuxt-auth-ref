<script setup lang="ts">
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
const { signIn } = useAuth()
async function signInWithGithub() {
  await signIn('github', { callbackUrl: '/protected' })
}

const UserName = ref()
const Email = ref()
const Password = ref()
const ConfirmPassword = ref()


async function signUpWithCredentials() {
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
      <p class="text-3xl font-extralight">Register</p>
      <form @submit.prevent="signUpWithCredentials" class="flex flex-col gap-5">
        <Input v-model="UserName" type="text" name="username" placeholder="Full Name" required />
        <Input v-model="Email" type="email" name="email" placeholder="Email" required />
        <Input v-model="Password" type="password" name="password" placeholder="Password" required />
        <Input v-model="ConfirmPassword" type="password" name="password" placeholder="Confirm Password" required />
        <Button>Create Account</Button>
      </form>
      <Button @click="signInWithGithub()">SignUp With Github</Button>
      <Button as-child variant="link">
        <NuxtLink to="/login">Already Have an Account?</NuxtLink>
      </Button>
    </section>
  </div>
</template>
