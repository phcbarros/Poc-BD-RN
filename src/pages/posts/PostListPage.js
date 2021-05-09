import React, { useEffect, useState } from 'react'
import { getRealm } from '../../services'

import PostList from './PostList'

import { Container } from './PostListPage.styles'

const PostListPage = (props) => {
  const { user } = props.route.params
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const loadPostsByUser = () => {
      const realm = getRealm()
      const data = realm.objects('Post').filtered(`user.id == ${user.id}`)
      setPosts(data)
    }
    loadPostsByUser()
  }, [user.id])

  return (
    <Container>
      <PostList posts={posts} />
    </Container>
  )
}

export default PostListPage
