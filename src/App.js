import React, { useState } from 'react'
import {
  FlatList,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native'
import { Avatar, Button, ListItem, Text } from 'react-native-elements'
import { getRealm } from './services/realm'

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
        posts: [],
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

export default function App() {
  const [users, setUsers] = useState([])
  //const [posts, setPosts] = useState([])
  //const [comments, setComments] = useState([])

  async function saveData() {
    try {
      const realm = getRealm()

      console.log('path', realm.path)
      const newPosts = await getPosts()
      const newComments = await getComments()
      const newUsers = await getUsers()

      let addedUsers = []
      let addedPosts = []
      realm.write(() => {
        realm.deleteAll()
        addedUsers = newUsers.map((user) => realm.create('User', user))
      })
      realm.write(() => {
        addedUsers.forEach((user) => {
          const data = newPosts.filter((post) => post.userId === user.id)
          addedPosts.push(
            ...data.map((post) => realm.create('Post', { ...post, user })),
          )
        })
      })

      realm.write(() => {
        addedPosts.forEach((post) => {
          const data = newComments.filter(
            (comment) => comment.postId === post.id,
          )
          data.map((comment) => realm.create('Comment', { ...comment, post }))
        })
      })

      realm.close()
    } catch (err) {
      console.warn(err)
    }
  }

  function loadUsers() {
    const realm = getRealm()
    const data = realm.objects('User')
    setUsers(data)
  }

  function renderUsers({ item }) {
    return (
      <TouchableHighlight onPress={() => {}}>
        <ListItem bottomDivider>
          <Avatar
            icon={{
              name: 'user',
              color: 'gray',
              type: 'font-awesome',
              size: 40,
            }}
            rounded
          />
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableHighlight>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Salvar dados" onPress={() => saveData()} />
        <Button title="Carregar usuários" onPress={() => loadUsers()} />
      </View>
      <View>
        {users.length ? <Text h3>Lista de usuários</Text> : null}
        <FlatList
          data={users}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderUsers}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
})
