export async function createUserAccount(UserName: string, Email: string, Password: string, ConfirmPassword: string) {
  console.log('Creating User Please Wait...')
  const data = await $fetch('/api/dashboard/User/', {
    method: 'POST',
    body: {
      UserName,
      Email,
      Password,
      ConfirmPassword
    }
  })
  console.log('User Created: ', data)
  return data
}

export async function getUsers() {

  const data = await $fetch('/api/dashboard/User', {
    method: 'GET',
  })
  return await data
}