import React, { useEffect, useState, useCallback } from 'react'
import { Alert, View } from 'react-native'
import { Button, Divider, Input, Text } from 'react-native-elements'
import {
  Container,
  Header,
  ButtonContainer,
  Subtitle,
} from './SQLitePage.styles'
import UserList from '../../components/UserList/UserList'
import { getPosts, getComments, getUsers, sqlite } from '../../services'

export default function SQLitePage() {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')

  function createTables() {
    sqlite.createTables()
    Alert.alert('Aviso', 'Tabelas criados com sucesso!')
  }

  async function saveData() {
    const newUsers = await getUsers()

    newUsers.map((user) => {
      const sql = `INSERT INTO users (name, username, email) VALUES ("${user.name}","${user.username}","${user.email}")`
      sqlite.save(sql)
    })

    const newPosts = await getPosts()
    newPosts.map((post) => {
      const sql = `INSERT INTO posts (title, body, user_id) VALUES ("${post.title}","${post.body}",${post.userId})`
      sqlite.save(sql)
    })

    const newComments = await getComments()
    newComments.map((comment) => {
      const sql = `INSERT INTO comments (name, email, body, post_id) VALUES ("${comment.name}","${comment.email}","${comment.body}",${comment.postId})`
      sqlite.save(sql)
    })

    Alert.alert('Aviso', 'Dados salvos com sucesso!')
  }

  function loadUsers() {
    const sql = 'SELECT * FROM users'

    sqlite.executeQuery(
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
    sqlite.executeQuery(
      sql,
      [],
      (results) => setUsers(results._array),
      (err) => console.warn(err),
    )
  }, [query])

  useEffect(() => {
    searchUser()
  }, [searchUser])

  return (
    <Container>
      <Header>
        <Text h1>Usando SQLite</Text>
        <Subtitle h4>
          Use os botões abaixo para criar as tabelas, salvar os dados e carregar
          os usuários
        </Subtitle>
      </Header>
      <ButtonContainer>
        <Button type="outline" title="Criar" onPress={() => createTables()} />
        <Button type="outline" title="Salvar" onPress={() => saveData()} />
        <Button
          type="outline"
          title="Carregar usuários"
          onPress={() => loadUsers()}
        />
      </ButtonContainer>
      <Input
        value={query}
        onChangeText={setQuery}
        placeholder="Digite o nome do usuário"
      />
      <UserList users={users} />
    </Container>
  )
}
