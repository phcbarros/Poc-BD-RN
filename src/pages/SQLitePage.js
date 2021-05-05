import React, { useEffect, useState, useCallback } from 'react'
import { View, StyleSheet, FlatList, TouchableHighlight } from 'react-native'
import { Button, Input, Text, ListItem, Avatar } from 'react-native-elements'
import { createTables, executeQuery, save } from '../services/sqlite'
import { getUsers } from '../services/users'
import { getPosts } from '../services/posts'
import { getComments } from '../services/comments'

export default function SQLitePage() {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  useEffect(() => {
    createTables()
  }, [])

  async function saveData() {
    const newUsers = await getUsers()

    newUsers.map((user) => {
      const sql = `INSERT INTO users (name, username, email) VALUES ("${user.name}","${user.username}","${user.email}")`
      save(sql)
    })

    const newPosts = await getPosts()
    newPosts.map((post) => {
      const sql = `INSERT INTO posts (title, body, user_id) VALUES ("${post.title}","${post.body}",${post.userId})`
      save(sql)
    })

    const newComments = await getComments()
    newComments.map((comment) => {
      const sql = `INSERT INTO comments (name, email, body, post_id) VALUES ("${comment.name}","${comment.email}","${comment.body}",${comment.postId})`
      save(sql)
    })
  }

  function loadUsers() {
    const sql = 'SELECT * FROM users'

    executeQuery(
      sql,
      [],
      (results) => {
        const data = results._array.map((user) => ({
          id: user.id,
          name: user.name,
          userName: user.username,
          email: user.email,
        }))
        setUsers(data)
      },
      (err) => {
        console.warn(err)
      },
    )
  }

  const searchUser = useCallback(() => {
    if (!query) {
      setUsers([])
      return
    }

    const sql = `SELECT * FROM users WHERE name like "%${query}%"`
    executeQuery(
      sql,
      [],
      (results) => setUsers(results._array),
      (err) => console.warn(err),
    )
  }, [query])

  useEffect(() => {
    searchUser()
  }, [searchUser])

  function renderUsers({ item }) {
    console.log(item)
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
      <Text h1>Usando SQLite</Text>
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
