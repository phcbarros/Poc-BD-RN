import React, { useEffect } from 'react'
import { Alert } from 'react-native'

import PostList from './PostList'

import { Container } from './PostListPage.styles'
import useQueryPostByUser from './useQueryPostsByUser'

const PostListPage = (props) => {
  const { user, provider } = props.route.params
  const { posts, error } = useQueryPostByUser(user.id, provider)

  useEffect(() => {
    if (!error) {
      return
    }
    Alert.alert('Aviso', error)
  }, [error])

  return (
    <Container>
      <PostList posts={posts} />
    </Container>
  )
}

export default PostListPage
