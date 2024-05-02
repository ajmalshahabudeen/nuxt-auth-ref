export async function getAccounts() {

  const data = await $fetch('/api/dashboard/Account/', {
    method: 'GET',
  })
  return await data
}