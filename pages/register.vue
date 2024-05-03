<script setup lang="ts">
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
const { signIn } = useAuth()
async function signInWithGithub() {
  await signIn('github', { callbackUrl: '/protected' })
}

async function signInWithGoogle() {
  await signIn('google', { callbackUrl: '/protected' })
}

const UserName = ref()
const Email = ref()
const Password = ref()
const ConfirmPassword = ref()

const error = ref(false)
const errorMessage = ref('')
const success = ref(false)
const loading = ref(false)
const passwordError = ref(false)

const clearConfirmPassword = () => {
  ConfirmPassword.value = ''
  passwordError.value = false
}

const checkPasswords = () => {
  if (Password.value !== ConfirmPassword.value) {
    passwordError.value = true
  } else {
    passwordError.value = false
  }
}


async function signUpWithCredentials() {
  loading.value = true
  console.log(UserName.value, Email.value, Password.value, ConfirmPassword.value)
  try {
    const data = await createUserAccount(UserName.value, Email.value, Password.value, ConfirmPassword.value)
    if (data.statusCode !== 200) {
      error.value = true
      errorMessage.value = data.statusMessage
      loading.value = false
      const interval = setInterval(() => {
        error.value = false
        clearInterval(interval)
      }, 3000)
    } else {
      success.value = true
      const interval = setInterval(() => {
        success.value = false
        clearInterval(interval)
      }, 3000)
    }
    console.log('frontend data: ', data)
    loading.value = false

    Password.value = ''
    ConfirmPassword.value = ''
    UserName.value = ''
    Email.value = ''
  }
  catch (e) {
    error.value = true
    errorMessage.value = 'Something went wrong. Please try again.'
    loading.value = false
    const interval = setInterval(() => {
      error.value = false
      clearInterval(interval)
    }, 3000)
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
      <p class="text-3xl font-extralight">Register</p>
      <form @submit.prevent="signUpWithCredentials()" class="flex flex-col gap-5">
        <Input v-model="UserName" type="text" name="username" placeholder="Full Name" required />
        <Input v-model="Email" type="email" name="email" placeholder="Email" required />
        <Input v-model="Password" @input="clearConfirmPassword()" type="password" name="password" placeholder="Password"
          required />
        <Input v-model="ConfirmPassword" @input="checkPasswords()" type="password" name="password"
          placeholder="Confirm Password" required />
        <p v-if="passwordError" class="text-red-500">{{ passwordError ? 'Passwords do not match' : '' }}</p>
        <p v-if="error" class="text-red-500"> {{ errorMessage }}</p>
        <p v-if="success" class="text-green-500">Account created successfully</p>
        <Button :disabled="passwordError || loading">{{ loading ? 'Please Wait' : 'Create Account' }}</Button>
      </form>
      <Button @click="signInWithGithub()">
        <Icon name="uil:github" size="20" class="mr-2" />
        SignUp With Github
      </Button>
      <Button @click="signInWithGoogle()">
        <Icon name="uil:google" size="20" class="mr-2" />
        SignUp With Google
      </Button>
      <Button as-child variant="link">
        <NuxtLink to="/login">Already Have an Account?</NuxtLink>
      </Button>
    </section>
  </div>
</template>
