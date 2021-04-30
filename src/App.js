import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { Button, ListItem } from 'react-native-elements'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { getRealm } from './services/realm'

export default function App() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])

  async function getUsers() {
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

  async function getPosts() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await response.json()
      return data
    } catch (err) {
      console.warn(err)
    }
  }

  async function getComments() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/comments',
      )
      const data = await response.json()
      return data
    } catch (err) {
      console.warn(err)
    }
  }

  async function saveData() {
    try {
      const realm = await getRealm()

      console.log('path', realm.path)
      const newPosts = await getPosts()
      const newComments = await getComments()
      const newUsers = await getUsers()

      realm.write(() => {
        realm.deleteAll()
        newUsers.map((user) => realm.create('Users', user))
        newPosts.map((post) => realm.create('Posts', post))
        newComments.map((comment) => realm.create('Comments', comment))
      })

      realm.close()
    } catch (err) {
      console.warn(err)
    }
  }

  async function loadUsers() {
    const realm = await getRealm()
    const data = realm.objects('Users')

    console.log(data)
    setUsers(data)
  }

  function renderUsers({ item }) {
    return (
      <ListItem>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']}>
        <Button title="Salvar dados no banco" onPress={() => saveData()} />
        <Button title="Carregar usuários" onPress={() => loadUsers()} />
        <FlatList
          data={users}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderUsers}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
