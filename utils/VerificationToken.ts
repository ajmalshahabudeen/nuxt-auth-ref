export async function getVerificationTokens() {

  const data = await $fetch('/api/dashboard/VerificationToken/', {
    method: 'GET',
  })
  return await data
}