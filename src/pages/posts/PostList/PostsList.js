import React from 'react'
import { FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'

const PostList = ({ posts }) => {
  function renderPosts({ item: post }) {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{post.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron
          iconProps={{
            name: 'chevron-forward',
            size: 24,
            type: 'font-awesome',
          }}
        />
      </ListItem>
    )
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderPosts}
    />
  )
}

export default React.memo(PostList)
