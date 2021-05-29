import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import PostList from './PostList'

import { Container } from './PostListPage.styles'
import useQueryPostByUser from './useQueryPostsByUser'

const PostListPage = (props) => {
  const { user, provider } = props.route.params
  const [posts, setPosts] = useState([])
  const { error, queryPostsByUserId } = useQueryPostByUser(provider)

  useEffect(() => {
    async function getPostsByUserId() {
      const data = await queryPostsByUserId(user.id)
      setPosts(data)
    }

    getPostsByUserId()
   
  }, [queryPostsByUserId, user.id])

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
