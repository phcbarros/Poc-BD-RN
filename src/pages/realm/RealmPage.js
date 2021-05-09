import React, { useCallback, useEffect, useState } from 'react'
import { Button, Text, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { Container, Header, ButtonContainer } from './RealmPage.styles'
import UserList from '../../components/UserList/UserList'
import { getRealm, getPosts, getComments, getUsers } from '../../services'

export default function RealmPage() {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const navigation = useNavigation()

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

  function handleSelectUser(user) {
    navigation.navigate('realm-posts', { user })
  }

  useEffect(() => {
    searchUser()
  }, [searchUser])

  return (
    <Container>
      <Header>
        <Text h1>Usando RealmDB</Text>
      </Header>
      <ButtonContainer>
        <Button
          type="outline"
          title="Salvar dados"
          onPress={() => saveData()}
        />
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
