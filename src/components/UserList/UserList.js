import React from 'react'
import { TouchableHighlight, FlatList } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'

const UserList = ({ users }) => {
  function renderUsers({ item }) {
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
    <FlatList
      data={users}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderUsers}
    />
  )
}

export default UserList
