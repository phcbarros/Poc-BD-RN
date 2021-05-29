import React from 'react'
import { FlatList } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const PostList = ({ comments, onSelect }) => {
  function renderItems({ item: comment }) {
    return (
      <ListItem bottomDivider onPress={() => onSelect(comment)}>
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
          <ListItem.Title>{comment.name}</ListItem.Title>
          <ListItem.Subtitle>{comment.email}</ListItem.Subtitle>
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
      data={comments}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItems}
    />
  )
}

export default React.memo(PostList)
