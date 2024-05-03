export async function getSession() {

  const data = await $fetch('/api/dashboard/Session', {
    method: 'GET',
  })
  return await data
}