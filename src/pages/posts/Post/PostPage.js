import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import CommentList from './CommentList'
import useQueryCommentsByPost from './CommentList/useQueryCommentsByPost'
import { Container, StyledText } from './PostPage.styles'

function PostPage(props) {
  const { post, provider } = props.route.params
  const { comments, error } = useQueryCommentsByPost(post.id, provider)

  useEffect(() => {
    if (!error) {
      return
    }
    Alert.alert('Aviso', error)
  }, [error])

  return (
    <Container>
      <StyledText h2>{post.title}</StyledText>
      <StyledText h4>{post.body}</StyledText>
      <CommentList comments={comments} onSelect={() => {}} />
    </Container>
  )
}

export default React.memo(PostPage)
