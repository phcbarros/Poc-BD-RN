import React, { useCallback } from 'react'
import { TouchableHighlight, FlatList } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'

const UserList = ({ users, onSelectUser }) => {
  console.log('render...')

  const handleSelectUser = useCallback(
    (user) => {
      const userSelected = {
        id: user.id,
        name: user.name,
        email: user.email,
        userName: user.username,
      }
      onSelectUser(userSelected)
    },
    [onSelectUser],
  )

  function renderUsers({ item }) {
    return (
      <TouchableHighlight onPress={() => handleSelectUser(item)}>
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
          <ListItem.Chevron
            iconProps={{
              name: 'chevron-forward',
              size: 24,
              type: 'font-awesome',
            }}
          />
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

export default React.memo(UserList)
