import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, View, StyleSheet, TouchableHighlight } from 'react-native'
import { Avatar, Button, ListItem, Text, Input } from 'react-native-elements'
import { getRealm } from '../services/realm'
import { getUsers } from '../services/users'
import { getPosts } from '../services/posts'
import { getComments } from '../services/comments'

export default function RealmPage() {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
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
      let addedComments = []
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
        addedUsers.map((user) => {
          const postsByUser = addedPosts.filter(
            (post) => post.user.id === user.id,
          )

          const newUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            posts: postsByUser,
          }
          realm.create('User', newUser, 'modified')
        })
      })

      realm.write(() => {
        addedPosts.forEach((post) => {
          const data = newComments.filter(
            (comment) => comment.postId === post.id,
          )
          addedComments.push(
            ...data.map((comment) =>
              realm.create('Comment', { ...comment, post }),
            ),
          )
        })
      })
      realm.write(() => {
        addedPosts.forEach((post) => {
          const commentsByPost = addedComments.filter(
            (comment) => comment.post.id === post.id,
          )

          const newPost = {
            id: post.id,
            title: post.title,
            body: post.body,
            user: post.user,
            comments: commentsByPost,
          }

          realm.create('Post', newPost, 'modified')
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

  const searchUser = useCallback(() => {
    if (!query) {
      setUsers([])
      return
    }
    const realm = getRealm()
    const data = realm.objects('User').filtered(`name CONTAINS "${query}"`)
    setUsers(data)
  }, [query])

  useEffect(() => {
    searchUser()
  }, [searchUser])

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
    <View style={styles.container}>
      <Text h1>Usando RealmDB</Text>
      <View style={styles.buttonContainer}>
        <Button title="Salvar dados" onPress={() => saveData()} />
        <Button title="Carregar usuários" onPress={() => loadUsers()} />
      </View>
      <View style={styles.container}>
        <Input
          value={query}
          onChangeText={setQuery}
          placeholder="Digite o nome do usuário"
        />
        {users.length ? <Text h3>Lista de usuários</Text> : null}
        <FlatList
          data={users}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderUsers}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
})
