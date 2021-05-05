export async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
    const newUsers = data.map((user) => {
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      }
    })
    return newUsers
  } catch (err) {
    console.warn(err)
  }
}
