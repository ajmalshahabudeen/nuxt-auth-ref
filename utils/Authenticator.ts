export async function getAuthenticator() {

  const data = await $fetch('/api/dashboard/Authenticator/', {
    method: 'GET',
  })
  return await data
}