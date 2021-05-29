import React, { useEffect, useState, useCallback } from 'react'
import { Alert } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import {
  Container,
  Header,
  ButtonContainer,
  Subtitle,
} from './SQLitePage.styles'
import UserList from '../../components/UserList/UserList'
import { getPosts, getComments, getUsers, sqlite } from '../../services'

function showAlert(msg) {
  Alert.alert('Aviso', msg)
}
export default function SQLitePage() {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const navigation = useNavigation()

  function createTables() {
    sqlite.createTables()
    showAlert('Tabelas criados com sucesso!')
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

    showAlert('Dados salvos com sucesso!')
  }

  async function loadUsers() {
    try {
      const sql = 'SELECT * FROM users'
      const result = await sqlite.executeQueryAsync(sql)
      setUsers(result)
    } catch (error) {
      showAlert('Erro ao buscar os usuários')
    }
  }

  const searchUser = useCallback(async () => {
    if (!query) {
      setUsers([])
      return
    }

    try {
      const sql = `SELECT * FROM users WHERE name like "%${query}%"`
      const result = await sqlite.executeQueryAsync(sql)
      setUsers(result)
    } catch (error) {
      showAlert('Erro ao buscar os usuários')
    }
  }, [query])

  useEffect(() => {
    searchUser()
  }, [searchUser])

  function handleSelectUser(user) {
    navigation.navigate('sqlite-posts', { user, provider: 'sqlite' })
  }

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
      <UserList users={users} onSelectUser={handleSelectUser} />
    </Container>
  )
}
